import "styles/global.scss";
import { AppProps } from "next/app";
import { ProviderApp } from "lib/context";
import { MenuTop } from "components/Menu";

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
						boxShadow: "0 1rem 1rem -1rem var(--accents-4)",
					}}
				>
					<Component {...pageProps} />
				</main>
			</ProviderApp>
		</>
	);
}
