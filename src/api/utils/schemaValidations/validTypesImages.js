const errorMessage = require("../errorMessage");
const validImagesTypes = ["image/png", "image/jpeg", "image/gif"];
const validStikerTypes = ["image/webp"];

const TypeValidationS3 = (key) => ({
  type: "string",
  enum: [...validImagesTypes, ...validStikerTypes],
  errorMessage: {
    type: errorMessage.typeString(key),
    enum: errorMessage.enums(key)(...validImagesTypes, ...validStikerTypes),
  },
});

module.exports = {
  validImagesTypes,
  validStikerTypes,
  TypeValidationS3,
};
