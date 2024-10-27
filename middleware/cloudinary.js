const fs = require("fs")

const cloudinary = require('cloudinary').v2;
const deleteLocalFile = require("../utils/deleteLocalFile")

cloudinary.config({
    secure: true
  });

  const uploadImage = async (imagePath) => {
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        quality:'auto',
        folder: "image_uploader"
      };
      try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        await deleteLocalFile(imagePath)
        return{
            publicId: result.public_id,
            url: result.secure_url
        }
      } catch (error) {
        console.error(error);
        await deleteLocalFile(imagePath)
        throw error;

      }

  };

  module.exports = uploadImage