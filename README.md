[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fbuilderio%2Fnextjs-shopify)

Next.js + Shopify + Builder.io starter kit.

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



# Get Started
- Install the Builder.io cli
```
npm install @builder.io/cli -g
```
- Clone this repo
```
git clone https://github.com/BuilderIO/nextjs-shopify.git
```
- [Signup for Builder.io](builder.io/signup), go to your [organization settings page](https://builder.io/account/organization), create a private key and copy it
```
cd nextjs-shopify
builder create -k [private-key] -n [space-name] -d
```
This command when done it'll print your new space's public api key, copy it and add it to your env files in this repo.

- Now you have a space clone matching the spec defined in this repo, you'll need to connect it to your shopify store.

- Create a private app in your shopify store and generate both admin api keys and storefront API token, use those tokens in the `@builder.io/plugin-shopify` settings, if this is your first time it'll pop up asking you for those details.

- add the storefront api token to the env files

- start developing
```
npm i
npm run dev
```
It'll start a server at `http://localhost:3000`

- go to your [new space settings](https://builder.io/account/space) and change the site url to your localhost `http://localhost:3000` , or commit and deploy to vercel and use vercel domain as the site url.

- happy hacking.

