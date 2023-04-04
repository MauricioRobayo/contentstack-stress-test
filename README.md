Create a delivery token and a management token and add them to your `.env`. Check [`.env.sample`](./.env.sample)

Install dependencies and run the `start` script: `yarn start`.

The script will create a webpage entry type with a `JSON rte` field, and then will start creating entries in batches.

It will report back the results of fetching two times the last entry added every 1000 entries.

Once the script is running you can check in contentstack the total entries that have been created so far by refreshing the entries tab.

Be patient!
