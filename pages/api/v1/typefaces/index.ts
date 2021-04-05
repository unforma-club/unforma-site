import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getData } from "lib/helper";
import { PULIPOLA_API } from "lib/constants";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
    const firebaseData = await getData();
    const pulipolaRequest = await axios.get(`${PULIPOLA_API}/typefaces`, {
        headers: { origin: "localhost:9992" },
    });
    const pulipolaData = pulipolaRequest.data;

    res.status(200).json({
        message: "ok",
        typefaces: firebaseData,
        pulipolaData,
    });
};
