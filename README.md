Copy [`.env.sample`](./.env.sample) to `.env` and fill the values.

Use the `populate-entries` script which will take two arguments: `total entries` and `content type title`.

For example, to create 50.000 entries of a content type called 'stress-test-entries', run:

```
run populate-entries 50000 stress-test-entries
```

It will create the `stress-test-entries` content type wit a single `json rte` field, and will create and publish 50.000 entries for that content type.

**[publishEntries](./src/publish-entries.ts)**: script to create an publish X amount of entries into a Stack. It will create a new content type with a single `json rte` field and create/publish all entries using that content type.

```ts
publishEntries({ total: 10_000, contentTypeTitle: "Stress Test" });
```

Optionally, you can run a custom function on every X amount of published entries:

```ts
publishEntries({
  total: 10_000,
  contentTypeTitle: "Stress Test",
  onEvery: {
    entries: 200,
    fn: (entries, contentTypeUid, entriesSoFar) => {
      console.log(entries, contentTypeUid, entriesSoFar);
    },
  },
});
```

**[measure-response-time](./src/measure-response-time.tsx)]**: script that will create and publish 10.000 entries, and will run the time it takes to perform a fetch request every time 200 entries has been added.

There is a npm script to run this test:

```
npm run measure-response-time
```

It will output three values separated by commas every 200 entries: `entries so far`, `response time without cache`, `response time with cache`.
