# n8n-nodes-google-images-api

An [n8n](https://n8n.io/) community node that searches Google Images and returns structured results: title, image URL, thumbnail, source, domain, and link. It is backed by the [Google Images API](https://apify.com/johnvc/google-images-api?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a query, and it returns one item per image with the title, full image URL, thumbnail, source, domain, and link to the page. It also works as an **AI Agent tool**, so an agent can find images on demand.

- Search Google Images for any query
- Localize with a country code and language code
- Control how many images to return
- Choose how much data to return per image: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-google-images-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Google Images** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**Image > Search** returns images that match a query.

| Parameter | Description |
| --- | --- |
| Search Query | The query to search images for. Required. |
| Country Code / Language Code | Localization, for example `us` and `en`. |
| Maximum Results per Query | How many images to return. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

Each image is returned as its own n8n item. The API returns more than ten fields per image, so the **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `title`, `imageUrl`, `thumbnailUrl`, `source`, `domain`, `link`, and `position`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns for each image, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `query` | string | The query that produced this result |
| `position` | integer | Rank in the results |
| `title` | string | Image title |
| `imageUrl` | string | Full-size image URL |
| `imageWidth` | integer | Image width in pixels |
| `imageHeight` | integer | Image height in pixels |
| `thumbnailUrl` | string | Thumbnail URL |
| `thumbnailWidth` | integer | Thumbnail width in pixels |
| `thumbnailHeight` | integer | Thumbnail height in pixels |
| `source` | string | Source site name |
| `domain` | string | Source domain |
| `link` | string | Link to the page hosting the image |
| `googleUrl` | string | Google Images result URL |

## Example workflows

### 1. Collect images for a moodboard

1. **Manual Trigger**.
2. **Google Images**: Search Query your theme, Output `Simplified`.
3. **Google Sheets** / **Airtable**: append `title` and `imageUrl`.

### 2. Find source attribution for images

1. **Manual Trigger**.
2. **Google Images**: your query.
3. **Set**: keep `imageUrl`, `source`, and `link` for attribution.

### 3. Let an AI Agent find images

1. **AI Agent** node.
2. Attach **Google Images** as a tool.
3. Ask "Find images of mid-century modern living rooms." The agent calls the node (in Simplified mode) and returns image URLs.

## Pricing

This node calls the [Google Images API](https://apify.com/johnvc/google-images-api?fpr=9n7kx3) on Apify, which is billed **pay-per-result** (about **$0.10 per 1,000 images**), with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/google-images-api?fpr=9n7kx3) for current rates.

## Resources

- [Google Images API on Apify](https://apify.com/johnvc/google-images-api?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-google-images-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
