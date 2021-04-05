import Axios from "axios";
import { IncomingMessage } from "node:http";
import admin from "./firebase/nodeApp";

export const getFetcher = (url: string) =>
    Axios.get(url).then((res) => res.data);

export const getBaseURL = (req: IncomingMessage) => {
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const url = process.browser ? window.location.host : req.headers.host;

    const BASE_URL = `${protocol}://${url}`;
    return BASE_URL;
};

export const getData = async () => {
    const db = admin.firestore();
    const testCollection = db.collection("typefaces");
    const data = await testCollection.get();
    const newData: any[] = [];
    data.forEach((a) => newData.push(a.data()));
    return newData;
};

export const readFiles = (files: File[]) =>
    Promise.all(
        files.map((file) => {
            const reader = new FileReader();
            return new Promise<{ file: string; name: string }>(
                (resolve, reject) => {
                    reader.onload = (e) =>
                        resolve({
                            file: e.target?.result as string,
                            name: file.name,
                        });
                    reader.onerror = () => reject;
                    reader.readAsDataURL(file);
                }
            );
        })
    );
