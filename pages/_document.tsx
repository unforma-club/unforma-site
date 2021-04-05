import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preload"
                        as="font"
                        type="font/ttf"
                        href="/fonts/Degular/Degular-Regular.ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        as="font"
                        type="font/ttf"
                        href="/fonts/Degular/Degular-Bold.ttf"
                        crossOrigin=""
                    />
                    <link rel="stylesheet" href="/fonts/Degular/degular.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
