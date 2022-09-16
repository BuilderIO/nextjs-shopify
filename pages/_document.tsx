import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import cheerio from 'cheerio'

/**
 * See this issue for more details https://github.com/emotion-js/emotion/issues/2040
 * Theme-ui using emotion which render styles inside template tags causing it not to apply when rendering
 * A/B test variations on the server, this fixes this issue by extracting those styles and appending them to body
 */
const extractABTestingStyles = (body: string) => {
  let globalStyles = ''

  if (body.includes('<template')) {
    const $ = cheerio.load(body)
    const templates = $('template')
    templates.toArray().forEach((element) => {
      const str = $(element).html()
      const styles = cheerio.load(String(str))('style')
      globalStyles += styles
        .toArray()
        .map((el) => $(el).html())
        .join(' ')
    })
  }
  return globalStyles
}

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage

    let globalStyles = ''
    ctx.renderPage = async (options) => {
      const render = await originalRenderPage(options)
      globalStyles = extractABTestingStyles(render.html)
      return render
    }
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      globalStyles,
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if(!(window.location.href.includes("nogtm"))){
                <!-- Google Tag Manager -->
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM}');
                <!-- End Google Tag Manager -->
              }
            `,
            }}
          />
          {/* END - GOOGLE TAG MANAGER */}
        </Head>
        <body>
          {/* START - GOOGLE TAG MANAGER for inside body tag */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <!-- Google Tag Manager (noscript) -->
              <iframe src='https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM}'
              height='0' width='0' style='display:none;visibility:hidden'></iframe>
              <!-- End Google Tag Manager (noscript) -->
            `,
            }}
          />
          {/* END - GOOGLE TAG MANAGER for inside body tag */}
          <style
            dangerouslySetInnerHTML={{
              __html: (this.props as any).globalStyles,
            }}
          ></style>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
