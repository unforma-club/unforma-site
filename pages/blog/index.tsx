import type { ChangeEvent } from "react";
import firebase from "lib/firebase/clientApp";
// import { readFiles } from "lib/helper";

type ReadFile = {
    name: string;
    file: string;
};

const uploadFiles = (response: ReadFile[]) => {
    const storageRef = firebase.storage().ref();
    return Promise.all(
        response.map(({ name, file }) => {
            const extension = name.split(".")[1];
            return new Promise<{ name: string; url: string }>((resolve) => {
                storageRef
                    .child(`test/${name}`)
                    .putString(file, "data_url", {
                        contentType: `font/${extension}`,
                    })
                    .then((res) =>
                        res.ref
                            .getDownloadURL()
                            .then((url) => resolve({ name, url }))
                    );
            });
        })
    );
};

const readFiles = (files: File[]) =>
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

export default function Page() {
    const handleChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        if (!files) return;
        const newFiles = Array.from(files);

        const mantep = await readFiles(newFiles);
        const fontURLs = await uploadFiles(mantep);
        // console.log(fontURLs);
        const db = firebase.firestore().collection("typefaces");
        db.doc("Degular")
            .set({ family: "Degular", files: fontURLs })
            .then((res) => console.log(res));
    };

    return (
        <>
            <form>
                <input
                    disabled
                    type="file"
                    multiple
                    onChange={handleChangeFileInput}
                    accept=".ttf, .otf"
                />
            </form>
            <p
                style={{
                    width: "100%",
                    maxWidth: 1200,
                    margin: "0 0 0 auto",
                    padding: "0 1rem",
                    fontSize: "2rem",
                }}
            >
                UNFORMA Blog was born out of our love of creating meaningful
                products, and our disdain for the status quo, the 14hr work
                days, and all the rest we've experienced in our 12 years at
                digital agencies, product companies, and studios. We've seen it
                all — so we found a better way to run a creative business, for
                us and for everyone we work with. Make A Difference.
            </p>
        </>
    );
}
