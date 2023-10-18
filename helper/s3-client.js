const fs = require("fs").promises;
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

const s3Config = async (accessKey = "AKIARHXQVEB3YRIYILG5", secretKey = "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", region = "ap-south-1") => {
    return await AWS.config.update({
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
        region: region,
    });
};

s3Config();

const s3 = new AWS.S3();

const uploadImage = async (image, imageName) => {
    const file = await fs.readFile(image);

    return await s3
        .putObject({
            Body: file,
            Bucket: "elasticbeanstalk-ap-south-1-085330305143",
            Key: imageName,
        })
        .promise();
};

const downloadImage = async () => {
    const data = await s3
        .getObject({
            Bucket: "elasticbeanstalk-ap-south-1-085330305143",
            Key: "data",
        })
        .promise();

    const createImage = await fs.writeFile("mys3-image.jpg", data.Body);

    return true;
};

module.exports = { s3Config, uploadImage };
