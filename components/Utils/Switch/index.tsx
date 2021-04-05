// import styles from "./switch.module.scss";
import { useTheme } from "@pulipola/ui";
import { useIsClient, useOnClickOutside } from "lib/hooks";
import { useRef, useState } from "react";

export const Switch = () => {
    const parentRef = useRef(null);
    const isClient = useIsClient();

    const { theme, themes, setTheme } = useTheme();
    const [toggle, setToggle] = useState(false);

    useOnClickOutside(parentRef, () => setToggle(false));

    if (!isClient) return <></>;

    return (
        <>
            <div ref={parentRef} style={{ position: "relative" }}>
                <button
                    aria-current={toggle}
                    style={{
                        width: 75,
                        borderRadius: "5rem",
                        height: "2rem",
                        padding: 0,
                        // border: "1px solid var(--accents-4)",
                        fontSize: "inherit",
                        textTransform: "capitalize",
                    }}
                    onClick={() => setToggle((prev) => !prev)}
                >
                    {theme}
                </button>
                {toggle && (
                    <div
                        style={{
                            position: "absolute",
                            top: "calc(100% + 0.5rem)",
                            backgroundColor: "var(--accents-2)",
                            border: "1px solid var(--accents-4)",
                            borderRadius: "0.5rem",
                            boxShadow: "0rem 0rem 1rem 0 var(--accents-3)",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {themes.map((item, i) => (
                            <button
                                key={i}
                                aria-current={theme === item}
                                onClick={() => {
                                    setTheme(item);
                                    setTimeout(() => setToggle(false), 100);
                                }}
                                style={{
                                    textTransform: "capitalize",
                                    width: "100%",
                                    borderRadius: 0,
                                    textAlign: "left",
                                    border: "none",
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
