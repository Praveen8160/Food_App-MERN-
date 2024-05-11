const { v2 } = require("cloudinary");
const fs=require("fs")
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadOnCloudinary = async (localpath) => {
  try {
    if (!localpath) return null;

    //upload the file on cloudinary
    const response = await v2.uploader.upload(localpath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localpath);// remove the locally saved temporary file as the upload operation got failed
    // file has been uploaded successfull
    return response;
  } catch (error) {
    fs.unlinkSync(localpath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

module.exports = UploadOnCloudinary;