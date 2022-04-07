const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file");
const middleware = require("../utils/middleware");
// route to upload file
router.post(
  "/",
  middleware.checkUploadLimit(),
  middleware.fileUpload(),
  fileController.uploadFile
);
// route to download file
router.get("/", middleware.checkDownloadLimit(), fileController.downloadFile);
// route to delete file
router.delete("/", fileController.deleteFile);

// export all the routes
module.exports = router;
