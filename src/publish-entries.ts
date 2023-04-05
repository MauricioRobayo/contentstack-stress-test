import * as dotenv from "dotenv";
dotenv.config();

import client from "./contentstack-client";
import crypto from "crypto";

/*
  https://www.contentstack.com/docs/developers/apis/content-management-api/#rate-limiting
  Read (GET) requests: 10 requests per second per organization
  Write (POST/PUT/DELETE) requests: 10 requests per second per organization
  Be careful modifying the following parameters!
*/
const BATCH_SIZE = 5; // could be 10 but prefer to be safe
const BATCH_INTERVAL_MS = 1_500; // could be 1000 but prefer to be safe

export async function publishEntries({
  total,
  contentTypeTitle,
  onEvery,
}: {
  total: number;
  contentTypeTitle: string;
  onEvery?: {
    entries: number;
    fn: (
      entries: any,
      contentTypeUid: string,
      entriesSoFar: number
    ) => Promise<void>;
  };
}) {
  const contentTypeUid = contentTypeTitle.replace(/\s+/g, "-");
  const contentTypeResult = await client.createContentType({
    title: contentTypeTitle,
    uid: contentTypeUid,
  });
  if ("error_code" in contentTypeResult) {
    if (contentTypeResult.error_code === 115) {
      console.log(`Content type '${contentTypeUid}' already exists.`);
    } else {
      console.log(JSON.stringify(contentTypeResult, null, 2));
      throw new Error("Failed to create content type");
    }
  }
  let batch = [];
  let batchResult = [];
  for (let i = 1; i <= total; i++) {
    const entryTitle = `${contentTypeUid}-${crypto.randomUUID()}`;
    batch.push(
      client.createEntry({
        title: entryTitle,
        contentTypeUid,
      })
    );

    if (batch.length >= BATCH_SIZE) {
      const entries = await Promise.all(batch);
      const successfulEntries = entries.filter(Boolean);
      if (onEvery) {
        batchResult.push(...successfulEntries);
      }
      await Promise.all(
        successfulEntries.map((result) =>
          client.publishEntry({
            entryUid: result.entry.uid,
            contentTypeUid,
          })
        )
      );

      await sleep(BATCH_INTERVAL_MS);
      batch = [];
    }

    if (onEvery && batchResult.length > 0 && i % onEvery.entries === 0) {
      await onEvery.fn(batchResult, contentTypeUid, i);
      batchResult = [];
    }
  }

  if (batch.length > 0) {
    console.log("remaining to process", batch.length);
    await Promise.all(batch);
  }

  process.exit(0);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
