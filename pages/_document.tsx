import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import cheerio from 'cheerio'

import { Builder } from '@builder.io/react';
import ivm from 'isolated-vm'

/**
 * Run content code bindings in SSR context
 */
const isolate = new ivm.Isolate({ memoryLimit: 128 });
const context = isolate.createContextSync();
Builder.setServerContext(context);

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
        <Head />
        <body>
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
