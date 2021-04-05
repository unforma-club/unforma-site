import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import axios, { AxiosResponse } from "axios";
import useSWR from "swr";
import { PULIPOLA_API, UNFORMA_URL } from "lib/constants";

type ServerResponse = {
    message: string;
    typefaces: { family: string; files: { name: string; url: string } }[];
};

export const getServerSideProps: GetServerSideProps<ServerResponse> = async () => {
    const request: AxiosResponse<ServerResponse> = await axios.get(
        `${PULIPOLA_API}/typefaces`,
        { headers: { origin: UNFORMA_URL } }
    );
    const response = request.data;
    return {
        props: {
            message: response.message,
            typefaces: response.typefaces,
        },
    };
};

const fetcher = (url: string) =>
    axios.get<{}, AxiosResponse<ServerResponse>>(url).then((res) => res.data);

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function Page(props: PageProps) {
    const { data } = useSWR(`${PULIPOLA_API}/typefaces`, fetcher, {
        initialData: props,
    });
    return (
        <>
            <div
                style={{
                    width: "100%",
                    maxWidth: 1200,
                    margin: "0 0 0 auto",
                    padding: "0 1rem",
                }}
            >
                <p style={{ fontSize: "2rem" }}>
                    We partner with clients and navigate them through the
                    challenges of creating innovative digital products.
                </p>

                {data && (
                    <ul>
                        {data.typefaces.map(({ family }, i) => (
                            <li key={i}>
                                <NextLink
                                    key={i}
                                    href={`/typefaces/[name]`}
                                    as={`/typefaces/${encodeURI(
                                        family.replace(/\s/g, "-")
                                    )}`}
                                >
                                    <a>{family}</a>
                                </NextLink>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
