import AWS from 'aws-sdk';

const generateRandomString = async (tfile) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 32; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }
    randomString += "." + tfile.name.split('.')[1];
    return randomString;
};

const Uploader = async (file, randomString, setFileStatus) => {
    try {
        AWS.config.update({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
        });
        const s3 = new AWS.S3({
            params: { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME },
            region: process.env.REACT_APP_AWS_REGION,
        });

        const params = {
            Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
            Key: randomString,
            Body: file,
            // ACL: 'public-read',
        };
        const Upload = s3
            .putObject(params)
            .on("httpUploadProgress", (evt) => {
                setFileStatus !== undefined ? setFileStatus((pre) => ({ ...pre, [file.name]: parseInt(`${(evt.loaded * 100) / evt.total}`) })) :
                    console.log(`${parseInt(`${(evt.loaded * 100) / evt.total}`)}%`);
            })
            .promise();
        return 'uploading'
    }
    catch (err) {
        console.log("ERROR_IN_AWS", err);
        return "error"
    }
    // console.log("file in upload", file)

}
let Upload = async (file, setFileStatus, setfileUrls) => {
    const randomString = await generateRandomString(file);
    const base_url = `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/`
    let url = base_url + randomString;
    const resp = await Uploader(file, randomString, setFileStatus)
    if (setfileUrls === undefined)
        return url
    if (resp !== "error" && setfileUrls !== undefined)
        await setfileUrls((pre) => ([...pre, url]))
    else if (setfileUrls !== undefined) {
        console.log('error');
    }

}

export default Upload;
