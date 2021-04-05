import { NextApiRequest, NextApiResponse } from "next";
import admin from "lib/firebase/nodeApp";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query.slug as string;
    const db = admin.firestore().collection("typefaces");
    const collection = await db.doc(slug).get();

    if (collection.exists) {
        res.status(200).json({ message: "ok", typeface: collection.data() });
    } else {
        res.status(200).json({ message: "unch" });
    }
};
