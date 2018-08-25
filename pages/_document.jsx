import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
   }

   render() {
      return (
         <html>
            <Head>
               <meta charSet="utf-8" />
               <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no"
               />
               <title>Mernstack ISR</title>
               <link rel="shortcut icon" href="/static/icons/shortcut.png" />
               <link rel="stylesheet" href="/static/css/style.css" />
               <link rel="stylesheet" href="/static/css/bulma.css" />
               <link rel="stylesheet" href="/static/css/animate.css" />
               <link rel="stylesheet" href="/static/css/reactToastify.css" />
               <link
                  rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
                  integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
                  crossOrigin="anonymous"
               />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </html>
      )
   }
}
