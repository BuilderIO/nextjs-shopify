# Next.js + Shopify + Builder.io starter kit

Demo live at: [headless.builders](https://headless.builders/)

## Goals and Features

- Performant by default
- SEO Ready
- Internationalization
- Responsive
- UI Components
- Theming
- Standardized Data Hooks
- Integrations - Integrate seamlessly with the most common ecommerce platforms.


## Get Started

### Install the Builder.io cli
```
npm install @builder.io/cli -g
```

### Clone this repo
```
git clone https://github.com/BuilderIO/nextjs-shopify.git
```

### Generate your Builder.io space
<!-- TODO: link "private key" to a forum post or doc showing how to create that -->
[Signup for Builder.io](https://builder.io/signup), then go to your [organization settings page](https://builder.io/account/organization?root=true), create a private key and copy it and supply it for `[private-key]` below. For `[space-name]` create a name for your space, such as "Next.js Shopify"

```
cd nextjs-shopify
builder create -k [private-key] -n [space-name] -d
```

This command when done it'll print your new space's public api key, copy it and add as the value for `BUILDER_PUBLIC_KEY` into the .env files (`.env.production` and `.env.development`)

```
BUILDER_PUBLIC_KEY=...
```

### Connect Shopify
Now you have a space clone matching the spec defined in this repo, you'll need to connect it to your shopify store.

Create a [private app](https://help.shopify.com/en/manual/apps/private-apps) in your Shpoify store. Be sure to check the box for Storefront API access.

<img src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F844a1eb444f44c759a8f931251cfee70" />


Access your newly created space, by selecting it from the [list of spaces](https://builder.io/spaces?root=true) in your organization, a prompt will ask you for all the requied details to connect shopify with builder and import your products/collections and register webhooks to listen to product/collection updates. 

Fill in the required tokens and press `Connect your store`, this might take a couple of minutes depending on your store size.

Add your storefront api token to the .env files (`.env.production` and `.env.development`)

```
SHOPIFY_STOREFRONT_API_TOKEN=...
SHOPIFY_STORE_DOMAIN=...
```

### Install dependencies
```
npm install
```

### Run the dev server
```
npm run dev
```
It'll start a server at `http://localhost:3000`

Go to your [new space settings](https://builder.io/account/space) and change the site url to your localhost `http://localhost:3000` for site editing.


### Deploy

You can deploy this code anywhere you like - you can find many deployment options for Next.js [here](https://nextjs.org/docs/deployment). For this project, we particularly recommend Vercel - it's as easy as signing up for Vercel and choosing your repo to deploy. See more info [here](https://nextjs.org/docs/deployment), or use the one click deploy option below:


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fbuilderio%2Fnextjs-shopify)


