import * as dotenv from "dotenv";
dotenv.config();

import contentStackClient from "./contentstack-client";
import crypto from "crypto";

/*
https://www.contentstack.com/docs/developers/apis/content-management-api/#rate-limiting
Read (GET) requests: 10 requests per second per organization
Write (POST/PUT/DELETE) requests: 10 requests per second per organization
*/
const BATCH_SIZE = 5; // could be 10 but prefer to be safe
const BATCH_INTERVAL_MS = 1500; // could be 1000 but prefer to be safe
const TOTAL_ENTRIES = 20;

async function main() {
  const contentTypeTitle = "stress test 123";
  const contentTypeResult = await contentStackClient.createContentType(
    contentTypeTitle
  );
  const contentTypeUid = contentTypeResult.content_type.uid;

  const batch = [];

  for (let i = 0; i < TOTAL_ENTRIES; i++) {
    const entryTitle = `${contentTypeTitle}-${crypto.randomUUID()}`;
    batch.push(
      contentStackClient.createEntry({
        title: entryTitle,
        contentTypeUid,
      })
    );
    console.log(batch.length);

    if (batch.length >= BATCH_SIZE) {
      const batchResult = await Promise.all(batch);
      console.log("waiting...");
      await new Promise((resolve) => setTimeout(resolve, BATCH_INTERVAL_MS));
      console.log("wait finished");
      batch.length = 0;
    }
  }

  if (batch.length > 0) {
    console.log("remaining to process", batch.length);
  }
}

main();
