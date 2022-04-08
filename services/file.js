const { Uploads } = require("../models/upload");
const { Downloads } = require("../models/download");
const { Files } = require("../models/file");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileService = {};

// Service function to store the fiel information in Files table
fileService.save = async (_data) => {
  // save in database
  let file;
  file = new Files(_data);
  file = await file.save();
  return file;
};

// Service funtion to find the file from Files table
fileService.find = async (params) => {
  let file = await Files.find(params);
  return file;
};

// Service funtion to find the file from Files table
fileService.findOne = async (params) => {
  let file = await Files.findOne(params);
  return file;
};
// Service function to update the file informaion in Files table
fileService.findByIdAndUpdate = async (id, update) => {
  let file = await Files.findByIdAndUpdate(id, update, {
    new: true,
  });
  return file;
};
// Service function to remove file from db
fileService.remove = async (params) => {
  let isRemoved = Files.deleteOne(params);
  return isRemoved;
};

// definig the file storage to be used with multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create Destination folder if not exists
    fs.mkdirSync("." + process.env.FOLDER, { recursive: true });
    cb(null, "." + process.env.FOLDER);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// Service function to upload the media in a folder and return back the path
fileService.uploadMedia = multer({
  storage: fileStorage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    callback(null, true);
  },
});
// Service function to delete file from directory
fileService.deleteFile = async (path) => {
  try {
    fs.unlinkSync(path);
    return true;
  } catch (err) {
    return false;
  }
};

let downloadService = {};
// Service function to store the download information in Downloads table
downloadService.save = async (params) => {
  let downloadFile;
  downloadFile = new Downloads(params);
  downloadFile = downloadFile.save();
  if (downloadFile) {
    return true;
  } else {
    return false;
  }
};
//Service function to count the total downloads today for a specific ip address
downloadService.totalDownloadToday = async (ip) => {
  let downloadCount = Downloads.count({
    $and: [
      {
        createdAt: {
          $gt: Math.floor(
            new Date(
              new Date().getFullYear() +
                "/" +
                (new Date().getMonth() + 1) +
                "/" +
                new Date().getDate()
            )
          ),
        },
      },
      {
        ipAddress: ip,
      },
    ],
  });
  return downloadCount;
};

let uploadService = {};
uploadService.save = async (_data) => {
  let upload;
  upload = new Uploads(_data);
  upload = await upload.save();
  return upload;
};

//Service function to count the total upload today for a specific ip address
uploadService.totalUploadToday = async (ip) => {
  let fileCount = Uploads.count({
    $and: [
      {
        createdAt: {
          $gt: Math.floor(
            new Date(
              new Date().getFullYear() +
                "/" +
                (new Date().getMonth() + 1) +
                "/" +
                new Date().getDate()
            )
          ),
        },
      },
      {
        ipAddress: ip,
      },
    ],
  });
  return fileCount;
};

module.exports = { fileService, uploadService, downloadService };
