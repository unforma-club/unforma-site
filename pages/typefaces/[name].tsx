import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { PULIPOLA_API, UNFORMA_URL } from "lib/constants";

type TypefaceFiles = {
    name: string;
    url: string;
};

type Typeface = {
    family: string;
    files: TypefaceFiles[];
};

type ServerResponse = {
    message: string;
    typefaces: Typeface[];
};

type ClientResponse = {
    message: string;
    typeface: Typeface;
};

interface ServerProps extends ClientResponse {
    slug: string;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
    query,
}) => {
    const slug = query.name?.toString().replace(/-/g, " ") as string;
    const request: AxiosResponse<ServerResponse> = await axios.get(
        `${PULIPOLA_API}/typefaces`,
        { headers: { origin: UNFORMA_URL } }
    );
    const response = request.data;
    const typeface = response.typefaces.find(
        (item) => item.family === slug
    ) as Typeface;
    return {
        props: {
            message: response.message,
            typeface,
            slug,
        },
    };
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    useEffect(() => {
        const installFont = () => {
            const clientTypefaces = props.typeface.files;
            clientTypefaces.map(({ url, name }) => {
                // @ts-ignore
                const fontface = new FontFace(
                    name.split(".")[0],
                    `url("${url}")`,
                    {
                        fontDisplay: "block",
                    }
                );
                return new Promise((resolve) => {
                    // @ts-ignore
                    fontface.load().then((loadedFont) => {
                        const newName: string = loadedFont.family;
                        // @ts-ignore
                        document.fonts.add(loadedFont);
                        console.log(
                            `%c>>> [new] ${newName}.`,
                            `color: #ff00ff;`
                        );
                        return resolve(newName);
                    });
                });
            });
        };
        installFont();
    }, []);

    return (
        <>
            <div
                style={{
                    width: "100%",
                    maxWidth: 1200,
                    margin: "0 0 0 auto",
                    padding: "0 1rem",
                    fontSize: "2rem",
                }}
            >
                <ul>
                    {props.typeface.files.map(({ name }, i) => (
                        <li key={i} style={{ fontFamily: name.split(".")[0] }}>
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
