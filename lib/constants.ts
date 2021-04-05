type LinkKey = "index" | "typefaces" | "about" | "blog";
type LinkProps = {
    id: number;
    key: LinkKey;
    label: string;
    paths: string[];
};

export const STATIC_LINKS: LinkProps[] = [
    { id: 0, key: "index", label: "Unforma®Club", paths: ["/"] },
    {
        id: 1,
        key: "typefaces",
        label: "Typefaces",
        paths: ["/typefaces", "/typefaces/[name]"],
    },
    { id: 2, key: "about", label: "About", paths: ["/about"] },
    { id: 3, key: "blog", label: "Blog", paths: ["/blog", "/blog/[title]"] },
];

export const PULIPOLA_API = process.env
    .NEXT_PUBLIC_UNFORMA_API_ENDPOINT as string;

export const UNFORMA_URL = process.env.NEXT_PUBLIC_UNFORMA_ORIGIN_URL as string;
