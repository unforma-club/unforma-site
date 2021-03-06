import styles from "./menu.module.scss";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useApp } from "lib/context";
import { Switch } from "components/Utils/Switch";

export const MenuTop = () => {
    const { pathname } = useRouter();
    const { isScroll } = useApp();
    return (
        <>
            <div data-scroll={isScroll} className={styles.top}>
                <NextLink href="/">
                    <a title="Go To Index" aria-current={pathname === "/"}>
                        Unforma®Club
                    </a>
                </NextLink>
                <a
                    href="https://ponpub.unforma.club"
                    target="_blank"
                    rel="noopener"
                >
                    Ponpub
                </a>
                <a
                    href="https://typetools.unforma.club"
                    target="_blank"
                    rel="noopener"
                >
                    Typetools
                </a>
                <Switch />
            </div>
        </>
    );
};
