import * as dotenv from "dotenv";
dotenv.config();

import client from "./contentstack-client";
import crypto from "crypto";

const TOTAL_ENTRIES = 10_000;

/*
  https://www.contentstack.com/docs/developers/apis/content-management-api/#rate-limiting
  Read (GET) requests: 10 requests per second per organization
  Write (POST/PUT/DELETE) requests: 10 requests per second per organization
  Be careful modifying the following parameters!
*/
const BATCH_SIZE = 5; // could be 10 but prefer to be safe
const BATCH_INTERVAL_MS = 1_500; // could be 1000 but prefer to be safe
const TEST_ENTRIES_INTERVAL = 1_000;

async function main() {
  const contentTypeTitle = "stress test 123";
  const contentTypeResult = await client.createContentType(contentTypeTitle);
  const contentTypeUid = contentTypeResult.content_type.uid;
  let batch = [];
  let batchResult = [];
  for (let i = 1; i <= TOTAL_ENTRIES; i++) {
    const entryTitle = `${contentTypeTitle}-${crypto.randomUUID()}`;
    batch.push(
      client.createEntry({
        title: entryTitle,
        contentTypeUid,
      })
    );

    if (batch.length >= BATCH_SIZE) {
      batchResult = await Promise.all(batch);
      await sleep(BATCH_INTERVAL_MS);
      batch = [];
    }

    if (batchResult.length > 0 && i % TEST_ENTRIES_INTERVAL === 0) {
      const entryUid = batchResult[0].entry.uid;
      const responseTimeWithoutCache = await getEntryResponseTime({ entryUid });
      const responseTimeWithCache = await getEntryResponseTime({ entryUid });
      console.log("Entries", i);
      console.log("Response time without cache", responseTimeWithoutCache);
      console.log("Response time with cache", responseTimeWithCache);
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
