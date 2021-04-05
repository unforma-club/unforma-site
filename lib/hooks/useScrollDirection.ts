import { useState, useEffect } from "react";

type useScrollDirectionProps = {
    init?: "no" | "up" | "down";
    treshold?: number;
    off?: boolean;
};

export const useScrollDirection = ({
    init = "no",
    treshold = 0,
    off,
}: useScrollDirectionProps) => {
    const [scrollDir, setScrollDir] = useState(init);
    const [scrollCount, setScrollCount] = useState(0);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
        const threshold = treshold || 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;
        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;
            setScrollCount(scrollY);
            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setScrollDir(scrollY > lastScrollY ? "down" : "up");
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };
        /**
         * Bind the scroll handler if `off` is set to false.
         * If `off` is set to true reset the scroll direction.
         */
        !off ? window.addEventListener("scroll", onScroll) : setScrollDir(init);
        return () => window.removeEventListener("scroll", onScroll);
    }, [init, treshold, off]);
    return { direction: scrollDir, scrollToTop, scrollCount };
};
