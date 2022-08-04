const readFileAsync = (file: Blob) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    })
}

const convertFileToDataUrl = async (file: Blob) => {
    try {
        let contentBuffer = await readFileAsync(file);
        // console.log(contentBuffer);
        return contentBuffer;
    } catch (err) {
        // console.log(err);
        return null;
    }
}

export default convertFileToDataUrl;