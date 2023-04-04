export class ContentstackClient {
  private readonly apiBaseUrl = "https://cdn.contentstack.io/v3";
  private readonly apiKey: string;
  private readonly managementToken: string;
  private readonly deliveryToken: string;
  private headers: Headers;

  constructor({
    apiKey,
    managementToken,
    deliveryToken,
  }: {
    apiKey: string;
    managementToken: string;
    deliveryToken: string;
  }) {
    this.apiKey = apiKey;
    this.managementToken = managementToken;
    this.deliveryToken = deliveryToken;
    this.headers = new Headers({
      api_key: this.apiKey,
      "content-type": "application/json",
    });
  }

  async createContentType(title: string) {
    const payload = JSON.stringify({
      content_type: {
        title,
        schema: [
          {
            display_name: "Title",
            uid: "title",
            data_type: "text",
            mandatory: true,
            unique: true,
            field_metadata: {
              _default: true,
            },
            non_localizable: false,
            multiple: false,
          },
          {
            display_name: "URL",
            uid: "url",
            data_type: "text",
            mandatory: true,
            field_metadata: {
              _default: true,
            },
            non_localizable: false,
            multiple: false,
            unique: false,
          },
          {
            data_type: "json",
            display_name: "JSON RTE",
            uid: "json_rte",
            field_metadata: {
              allow_json_rte: true,
              description: "",
              default_value: "",
            },
            non_localizable: false,
            multiple: false,
            mandatory: false,
            unique: false,
          },
        ],
        options: {
          is_page: true,
          singleton: false,
          title: "title",
          sub_title: [],
          url_pattern: `${title}/:title`,
          url_prefix: "/",
        },
      },
    });
    this.headers.append("authorization", this.managementToken);
    const response = await fetch(`${this.apiBaseUrl}/content_types`, {
      method: "POST",
      headers: this.headers,
      body: payload,
    });

    return response.json();
  }

  async createEntry({
    title,
    contentTypeUid,
    locale = "",
  }: {
    title: string;
    contentTypeUid: string;
    locale?: string;
  }) {
    const payload = JSON.stringify({
      entry: {
        title,
        json_rte: {
          type: "doc",
          attrs: {},
          uid: "299a8cf06d434b0c8567e3403c44f832",
          children: [
            {
              uid: "ae106ff59f0246a392e4a51dd778db31",
              type: "p",
              attrs: {},
              children: [
                {
                  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut. Libero id faucibus nisl tincidunt eget nullam non. Sed elementum tempus egestas sed sed. In dictum non consectetur a erat nam at. Tempor orci eu lobortis elementum nibh tellus. Ut aliquam purus sit amet. Tristique nulla aliquet enim tortor at. Enim eu turpis egestas pretium aenean pharetra magna ac. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Vel risus commodo viverra maecenas accumsan lacus vel facilisis.",
                },
              ],
            },
            {
              uid: "ae6e1021387541c1ad3d36f4fd44a43a",
              type: "p",
              attrs: {},
              children: [
                {
                  text: "Rutrum quisque non tellus orci. Aliquam sem et tortor consequat id porta. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Molestie at elementum eu facilisis. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Lobortis scelerisque fermentum dui faucibus. Gravida in fermentum et sollicitudin ac orci. Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Quis blandit turpis cursus in hac habitasse platea dictumst. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Nisi quis eleifend quam adipiscing. Blandit volutpat maecenas volutpat blandit aliquam etiam. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean. Sed risus pretium quam vulputate dignissim suspendisse in est. Quam elementum pulvinar etiam non quam. Etiam erat velit scelerisque in dictum non consectetur a. Elementum tempus egestas sed sed. Sodales ut etiam sit amet nisl.",
                },
              ],
            },
            {
              uid: "6491026239fe4b2fb68a4f1e74114f49",
              type: "p",
              attrs: {},
              children: [
                {
                  text: "Sollicitudin tempor id eu nisl nunc mi. Dui accumsan sit amet nulla facilisi morbi tempus iaculis. Tellus mauris a diam maecenas sed. Nulla posuere sollicitudin aliquam ultrices sagittis orci. Urna nec tincidunt praesent semper feugiat nibh sed. Vel elit scelerisque mauris pellentesque. Lobortis feugiat vivamus at augue eget. Ac ut consequat semper viverra nam libero justo laoreet sit. Euismod quis viverra nibh cras pulvinar mattis. Auctor urna nunc id cursus. Feugiat in ante metus dictum at tempor. Gravida neque convallis a cras semper auctor neque vitae tempus. Faucibus pulvinar elementum integer enim neque volutpat.",
                },
              ],
            },
            {
              uid: "87487a83de90473199eb5ddd8cb2b81b",
              type: "p",
              attrs: {},
              children: [
                {
                  text: "Tempus urna et pharetra pharetra massa. Eget mi proin sed libero enim. Morbi enim nunc faucibus a. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Elementum curabitur vitae nunc sed velit. Augue neque gravida in fermentum et sollicitudin. Nulla facilisi cras fermentum odio eu feugiat. Etiam erat velit scelerisque in dictum non consectetur a erat. Malesuada fames ac turpis egestas maecenas pharetra convallis. Quam quisque id diam vel quam. Vestibulum lectus mauris ultrices eros in cursus. A arcu cursus vitae congue mauris rhoncus. Nibh nisl condimentum id venenatis a condimentum vitae. Blandit libero volutpat sed cras ornare arcu dui vivamus arcu. Nibh sit amet commodo nulla facilisi nullam vehicula.",
                },
              ],
            },
            {
              uid: "cfc66078dfa74a00857afeeb75ba143f",
              type: "p",
              attrs: {},
              children: [
                {
                  text: "Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Consequat nisl vel pretium lectus quam id. Ante metus dictum at tempor commodo ullamcorper a lacus. Mauris ultrices eros in cursus turpis massa tincidunt dui. Dignissim diam quis enim lobortis scelerisque fermentum dui. Ante metus dictum at tempor commodo ullamcorper. Volutpat odio facilisis mauris sit amet. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Quis lectus nulla at volutpat diam. Mauris nunc congue nisi vitae suscipit.",
                },
              ],
            },
          ],
          _version: 1,
        },
      },
    });

    const response = await fetch(
      `${this.apiBaseUrl}/content_types/${contentTypeUid}/entries?locale=${locale}`,
      {
        method: "POST",
        headers: this.headers,
        body: payload,
      }
    );

    return response.json();
  }
}

export default new ContentstackClient({
  apiKey: process.env.CONTENTSTACK_API_KEY ?? "",
  managementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN ?? "",
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN ?? "",
});
