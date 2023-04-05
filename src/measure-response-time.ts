import { createEntries } from "./create-entries";
import client from "./contentstack-client";

createEntries({
  total: 50_000,
  contentTypeTitle: "st-123",
  onEvery: {
    entries: 200,
    fn: onEveryFn,
  },
  logProgress: false,
  publishEntries: true,
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
    console.log(
      `Failed to fetch entry: '${options.entryUid}'`,
      JSON.stringify(data, null, 2)
    );
    return null;
  }
  return performance.now() - start;
}
