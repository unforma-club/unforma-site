import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preload"
                        as="font"
                        href="/fonts/space-grotesk/SpaceGrotesk-VariableFont_wght.ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="/styles/global.css"
                        crossOrigin=""
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
