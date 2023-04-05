import { publishEntries } from "./publish-entries";
import client from "./contentstack-client";

publishEntries({
  total: 10_000,
  contentTypeTitle: "stress test 123",
  onEvery: {
    entries: 200,
    fn: onEveryFn,
  },
});

async function onEveryFn(
  entries: any,
  contentTypeUid: string,
  entriesSoFar: number
) {
  const lastEntryUid = entries.at(-1).entry.uid;
  const responseTimeWithoutCache = await getEntryResponseTime({
    entryUid: lastEntryUid,
    contentTypeUid,
  });
  const responseTimeWithCache = await getEntryResponseTime({
    entryUid: lastEntryUid,
    contentTypeUid,
  });
  console.log(
    `${lastEntryUid},${entriesSoFar},${responseTimeWithoutCache},${responseTimeWithCache}`
  );
}

async function getEntryResponseTime(options: {
  entryUid: string;
  contentTypeUid: string;
  locale?: string;
}) {
  const start = performance.now();
  const data = await client.getEntry(options);
  if ("error_code" in data) {
    console.log(JSON.stringify(data, null, 2));
    throw new Error(`Failed to fetch entry ${options.entryUid}`);
  }
  return performance.now() - start;
}
