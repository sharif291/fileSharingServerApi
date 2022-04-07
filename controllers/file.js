const {
  fileService,
  uploadService,
  downloadService,
} = require("../services/file");
const helper = require("../utils/helper");
const { generalResponse } = require("../utils/response.helper");
var path = require("path");
const fs = require("fs");

const fileController = {};

// Controller function that handles file upload
fileController.uploadFile = async (req, res) => {
  try {
    // Generate random private and public key
    const { publicKey, privateKey } = await helper.generateKeys();
    let file;
    // Calling the file upload services to uplaod the data in database
    file = await fileService.save({
      filePath: req.body.file,
      publicKey: publicKey,
      privateKey: privateKey,
      // ipAddress: req.ip,
    });
    //return null as a response if file not uploaded succesfully
    if (!file) {
      return res
        .status(422)
        .send(generalResponse(422, "failled", "Something Went Wrong", null));
    }
    let upload;
    upload = await uploadService.save({
      filePath: req.body.file,
      ipAddress: req.ip,
    });
    if (!upload) {
      return res
        .status(422)
        .send(generalResponse(422, "failled", "Something Went Wrong", null));
    }
    // return back the public key and private key as a response on succesful upload
    return res.status(200).send(
      generalResponse(200, "success", "Upload Succesfull", {
        publicKey: file.publicKey,
        privateKey: file.privateKey,
      })
    );
  } catch (error) {
    return res
      .status(400)
      .send(generalResponse(400, "failled", "Bad Request", error));
  }
};

// Controller function thet handle the file delete operation
fileController.deleteFile = async (req, res) => {
  try {
    // check and get the file information if exists with the private key
    let file = await fileService.findOne({ privateKey: req.query.privateKey });
    // return no no content message if file not exists
    if (!file) {
      return res
        .status(209)
        .send(generalResponse(209, "failled", "No content Available", null));
    }
    // store the path of the file with given private key
    const path = __dirname + "/../" + file.filePath;
    // delete the file from the path directory
    let isRemovedFromDirectory = await fileService.deleteFile(path);
    if (!isRemovedFromDirectory) {
      return res
        .status(400)
        .send(generalResponse(400, "failled", "Failed to delete file", null));
    }
    let isRemoved = await fileService.remove({
      privateKey: req.query.privateKey,
    });
    if (!isRemoved) {
      return res
        .status(200)
        .send(
          generalResponse(
            200,
            "success",
            "File Deleted from directory but not from DB",
            null
          )
        );
    }
    return res
      .status(200)
      .send(generalResponse(200, "success", "File Deleted Succesfully", null));
  } catch (error) {
    return res
      .status(400)
      .send(generalResponse(400, "failled", "Bad Request", error));
  }
};

// Controller function that handle the file download request
fileController.downloadFile = async (req, res) => {
  try {
    let file;
    // Find the file information with request public key
    file = await fileService.findOne({ publicKey: req.query.publicKey });
    // Retunt null if no file availabel with the public key
    if (!file) {
      return res
        .status(400)
        .send(
          generalResponse(
            209,
            "failled",
            "No such file with the public key",
            null
          )
        );
    }
    // Store the path directory
    const path = __dirname + "/../" + file.filePath;
    // Execute if file exists in path directory
    if (fs.existsSync(path)) {
      // Store the download information of the file for the ip address
      let downloadFile = await downloadService.save({
        filePath: file.filePath,
        ipAddress: req.ip,
      });
      if (downloadFile) {
        // Update the file last activity on file download
        let updateFile = await fileService.findByIdAndUpdate(file._id, {
          lastActivity: new Date(),
        });
        if (!updateFile) {
          return res
            .status(400)
            .send(
              generalResponse(400, "failled", "Something Went Wrong", null)
            );
        }
      }
      // Create and response the file stream
      let fileStream = fs.createReadStream(path);
      fileStream.pipe(res.status(200));
    } else {
      return res
        .status(209)
        .send(generalResponse(209, "failled", "No Content Available", null));
    }
  } catch (error) {
    // console.log(error);
    return res
      .status(400)
      .send(generalResponse(400, "failled", "Bad Request", error));
  }
};

module.exports = fileController;
