const AWS = require("aws-sdk");

const { v4: uuid } = require("uuid");

const {
  validImagesTypes,

  validStikerTypes,
} = require("./utils/schemaValidations/validTypesImages");

// Carga la configuración del archivo s3.yml

const FILES_BUCKET = process.env.UploadBucket;

const s3 = new AWS.S3();

const getPresignedURLS3 = async (event) => {
  const { queryStringParameters } = event;
  const { mimeType } = queryStringParameters;

  if (!mimeType) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "El tipo del archivo no fue proporcionado",
      }),
    };
  }

  const validMimeTypes = [...validImagesTypes, ...validStikerTypes];
  if (!validMimeTypes.includes(mimeType)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message:
          "El mimeType de archivo proporcionado no es válido para el tipo message.",
      }),
    };
  }

  try {
    const key = `image/${uuid()}`;
    const params = {
      Bucket: FILES_BUCKET,
      Expires: 300, // 5 min para enviar el archivo
      ContentType: mimeType,
      Key: key,
    };

    const url = await s3.getSignedUrlPromise("putObject", params);
    const fileUrl = `https://${FILES_BUCKET}.s3.amazonaws.com/${key}`;
    // https://one-vision-image.s3.amazonaws.com/image/572d1a9f-1045-45a5-bbc3-e5837ed9758d
    return {
      statusCode: 200,
      body: JSON.stringify({ url, fileUrl }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al generar la URL prefirmada de S3",
      }),
    };
  }
};

exports.handler = getPresignedURLS3;
