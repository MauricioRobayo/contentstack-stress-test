import { createEntries } from "./create-entries";

const total = Number(process.argv[2] ?? 10_000);
const contentTypeTitle = process.argv[3] ?? "Stress Test";

console.log(`Createing ${total} entries of content type '${contentTypeTitle}'`);

createEntries({
  total: Number(process.argv[2] ?? 10_000),
  contentTypeTitle,
  logProgress: true,
  publishEntries: true,
});
