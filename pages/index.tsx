import { STATIC_LINKS } from "lib/constants";
import { useDate, useIsClient } from "lib/hooks";
import NextHead from "next/head";
import NextLink from "next/link";
import pJson from "../package.json";

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
                    transform: "translate(-50%, calc(-50% - 3rem))",
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

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                    }}
                >
                    {STATIC_LINKS.map(({ label, paths }, i) => (
                        <NextLink key={i} href={paths[0]}>
                            <a>{label}</a>
                        </NextLink>
                    ))}
                </div>
            </div>
        </>
    );
}
