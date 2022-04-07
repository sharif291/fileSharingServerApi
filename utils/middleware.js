const {
  uploadService,
  downloadService,
  fileService,
} = require("../services/file");
const helper = require("./helper");
const { generalResponse } = require("./response.helper");

const middleware = {};
// middleware to check if download limiter
middleware.checkUploadLimit = () => async (req, res, next) => {
  try {
    // count total upload for a specific ip address in a day
    let totalUploadToday = await uploadService.totalUploadToday(req.ip);
    // If limit exists response Daily Upload Limit Reached
    if (totalUploadToday >= process.env.DAILYUPLOADLIMIT) {
      return res
        .status(500)
        .send(
          generalResponse(500, "failled", "Daily Upload Limit Reached", null)
        );
    }
    // If limit not reached then call next
    else {
      next();
    }
  } catch (error) {
    return generalResponse(400, false, "Something went wrong!", error);
  }
};
// Middelware to check daily download limit
middleware.checkDownloadLimit = () => async (req, res, next) => {
  try {
    // Count total download for a specific ip address in a day
    let totalUploadToday = await downloadService.totalDownloadToday(req.ip);
    // if limit exceed Response Daily Download Limit Reached
    if (totalUploadToday >= process.env.DAILYDOWNLOADLIMIT) {
      return res
        .status(500)
        .send(
          generalResponse(500, "failled", "Daily Download Limit Reached", null)
        );
    } else {
      next();
    }
  } catch (error) {
    return generalResponse(400, false, "Something went wrong!", error);
  }
};

// Middleware for storing the file and return back the path of the file as a request body
middleware.fileUpload = () => async (req, res, next) => {
  try {
    // Upload the file with the function
    request = fileService.uploadMedia.fields([{ name: "file", maxCount: 1 }]);
    // checking the request body
    request(req, res, async () => {
      if (req && req.files) {
        // set the path of the file as a request body to store the path in a DB
        for (const [key, value] of Object.entries(req.files)) {
          req.body[key] = value[0].path;
        }
      }
      next();
    });
  } catch (error) {
    return generalResponse(400, false, "Something went wrong!", error);
  }
};

module.exports = middleware;
