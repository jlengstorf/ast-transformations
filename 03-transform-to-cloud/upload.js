require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const DEFAULT_FLUID_MAX_WIDTH = 5000;
const DEFAULT_FLUID_MIN_WIDTH = 200;

module.exports = ({ imagePath, name }) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  cloudinary.uploader.upload(imagePath, {
    folder: 'ast-transforms',
    public_id: name,
    responsive_breakpoints: [
      {
        create_derived: false,
        bytes_step: 20000,
        min_width: DEFAULT_FLUID_MIN_WIDTH,
        max_width: DEFAULT_FLUID_MAX_WIDTH,
        max_images: 20
      }
    ]
  });
};
