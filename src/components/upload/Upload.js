import { useState } from "react";

export const uploadImg = () => {
    const [image, setImage] = useState();
    const [imageName, setImageName] = useState("");

    const saveImage = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("fileName", imageName);
        try {
            const res = await fetch.post(
                "http://localhost:3001/upload",
                formData
            );
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };
};