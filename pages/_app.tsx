import "styles/fonts.scss";
import "styles/global.scss";
import { AppProps } from "next/app";
import { ProviderApp } from "lib/context";
import { MenuTop, MenuBottom } from "components/Menu";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ProviderApp>
                <MenuTop />
                <main
                    style={{
                        padding: "6rem 0 0",
                        minHeight: "100vh",
                        position: "relative",
                        zIndex: 10,
                        backgroundColor: "inherit",
                        marginBottom: "var(--footer-height)",
                        boxShadow: "0 1rem 1rem -1rem var(--accents-4)",
                    }}
                >
                    <Component {...pageProps} />
                </main>
                <footer
                    style={{
                        position: "fixed",
                        bottom: 0,
                        height: "var(--footer-height)",
                        // color: "var(--background)",
                        // backgroundColor: "var(--accents-1)",
                        // backgroundColor: "blue",
                        backgroundColor: "var(--geist-unforma)",
                        width: "100%",
                        padding: "6rem 1rem 1rem",
                    }}
                >
                    <p
                        style={{
                            fontSize: "3rem",
                            lineHeight: 1,
                            fontWeight: "bold",
                            width: "100%",
                            maxWidth: 1200,
                            margin: "0 0 0 auto",
                        }}
                    >
                        This space is not for everyone. This space is not mass
                        produced. Conventional. Or influenced. This space is
                        personal. Experimental. True. A place for unique
                        products and experiences from the individuals shaping
                        tomorrow.
                    </p>
                </footer>
                <MenuBottom />
            </ProviderApp>
        </>
    );
}
