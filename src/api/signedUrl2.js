const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

exports.handler = async () => {
  const result = await getUploadURL();
  return result;
};

const getUploadURL = async function () {
  const randomID = parseInt(Math.random() * 1000);
  const Key = `Imagens3${randomID}`;

  const s3Params = {
    Bucket: process.env.UploadBucket,
    Key,
    ContentType: "image/png",
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", s3Params);
  const imageLocation = `https://${
    s3Params.Bucket
  }.s3.amazonaws.com/${encodeURIComponent(s3Params.Key)}`;

  return {
    statusCode: 200,
    isBase64Encoded: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      uploadURL: uploadURL,
      photoFilename: Key,
      imageLocation,
    }),
  };
};
