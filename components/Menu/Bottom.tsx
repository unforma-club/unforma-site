import styles from "./menu.module.scss";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useTransition, animated } from "react-spring";
import { STATIC_LINKS } from "lib/constants";
import { useApp } from "lib/context";

export const MenuBottom = () => {
    const { pathname } = useRouter();
    const { isScroll } = useApp();
    const links = STATIC_LINKS.filter(({ key }) => key !== "index");

    const state = pathname !== "/";
    // const transitions = useTransition(state, null, {
    //     from: { opacity: 0, transform: "translate(-50%, 200%) scale(0.5)" },
    //     enter: { opacity: 1, transform: "translate(-50%, 0%) scale(1)" },
    //     update: { opacity: 1, transform: "translate(-50%, 0%) scale(1)" },
    //     leave: { opacity: 0, transform: "translate(-50%, 200%) scale(0.5)" },
    //     config: { mass: 5, tension: 2000, friction: 200 },
    // });
    const transitions = useTransition(state, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        update: { opacity: 1 },
        leave: { opacity: 0 },
        config: { mass: 5, tension: 2000, friction: 200 },
    });

    return (
        <>
            {transitions.map(
                ({ item, key, props }) =>
                    item && (
                        <animated.nav
                            key={key}
                            data-scroll={isScroll}
                            className={styles.bottom}
                            style={props}
                        >
                            {links.map(({ label, paths }, i) => (
                                <NextLink key={i} href={paths[0]}>
                                    <a
                                        title={`Go To ${label}`}
                                        aria-current={paths.includes(pathname)}
                                        data-dynamic={pathname === paths[1]}
                                    >
                                        {label}
                                    </a>
                                </NextLink>
                            ))}
                        </animated.nav>
                    )
            )}
        </>
    );
};
