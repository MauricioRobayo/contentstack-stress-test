import * as dotenv from "dotenv";
dotenv.config();

import client from "./contentstack-client";
import crypto from "crypto";

/*
https://www.contentstack.com/docs/developers/apis/content-management-api/#rate-limiting
Read (GET) requests: 10 requests per second per organization
Write (POST/PUT/DELETE) requests: 10 requests per second per organization
*/
const BATCH_SIZE = 5; // could be 10 but prefer to be safe
const BATCH_INTERVAL_MS = 1500; // could be 1000 but prefer to be safe
const TOTAL_ENTRIES = 20;
const TEST_RESPONSE_INTERVAL = 5;

async function main() {
  const contentTypeTitle = "stress test 123";
  const contentTypeResult = await client.createContentType(contentTypeTitle);
  const contentTypeUid = contentTypeResult.content_type.uid;
  const batch = [];
  for (let i = 0; i < TOTAL_ENTRIES; i++) {
    const entryTitle = `${contentTypeTitle}-${crypto.randomUUID()}`;
    batch.push(
      client.createEntry({
        title: entryTitle,
        contentTypeUid,
      })
    );

    let batchResult = [];
    if (batch.length >= BATCH_SIZE) {
      batchResult = await Promise.all(batch);
      await sleep(BATCH_INTERVAL_MS);
      batch.length = 0;
    }

    if ((i + 1) % TEST_RESPONSE_INTERVAL === 0) {
      console.log(batch);
      const entryUid = batchResult[0].entry.uid;
      console.log(await getEntryResponseTime({ entryUid }));
    }
  }

  if (batch.length > 0) {
    console.log("remaining to process", batch.length);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getEntryResponseTime({
  entryUid,
  locale = "",
}: {
  entryUid: string;
  locale?: string;
}) {
  const start = performance.now();
  await client.getEntry({ entryUid, locale });
  return performance.now() - start;
}

main();
