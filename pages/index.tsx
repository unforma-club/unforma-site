import NextHead from "next/head";
import pJson from "../package.json";
import { useDate, useIsClient } from "lib/hooks";

export default function Page() {
	const { clock } = useDate();
	const isClient = useIsClient();
	return (
		<>
			<NextHead>
				<title>Unforma Club</title>
			</NextHead>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<div
					style={{
						fontSize: "16vw",
						fontWeight: "bold",
						lineHeight: 1,
						textAlign: "center",
						fontVariantNumeric: "tabular-nums",
						whiteSpace: "nowrap",
						userSelect: "none",
						pointerEvents: "none",
						touchAction: "none",
					}}
				>
					{isClient && clock}
					<br />
					V.{pJson.version}
				</div>
			</div>
		</>
	);
}
