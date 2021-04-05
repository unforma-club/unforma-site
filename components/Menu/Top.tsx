import styles from "./menu.module.scss";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { STATIC_LINKS } from "lib/constants";
import { Switch } from "components/Utils/Switch";
import { useApp } from "lib/context";

export const MenuTop = () => {
    const { pathname } = useRouter();
    const linkIndex = STATIC_LINKS.find(({ key }) => key === "index");
    const { isScroll } = useApp();
    return (
        <>
            {linkIndex && (
                <div data-scroll={isScroll} className={styles.top}>
                    <NextLink href={linkIndex.paths[0]}>
                        <a
                            title={`Go To ${linkIndex.label}`}
                            aria-current={linkIndex.paths.includes(pathname)}
                        >
                            {linkIndex.label}
                        </a>
                    </NextLink>
                    <Switch />
                </div>
            )}
        </>
    );
};
