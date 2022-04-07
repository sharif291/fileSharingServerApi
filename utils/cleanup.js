const path = require("path");
const { fileService } = require("../services/file");
const helper = require("./helper");

const cleanup = async () => {
  try {
    // Inactive for
    let inactiveFor = process.env.INACTIVEFOR;
    // find inactive from time
    let date = new Date();
    date.setMilliseconds(date.getMilliseconds() - inactiveFor);
    //   date = date.toISOString();

    let files = await fileService.find({
      $or: [
        {
          $and: [
            { lastActivity: { $exists: true } },
            {
              lastActivity: {
                $lt: Math.floor(new Date(date)),
              },
            },
          ],
        },
        {
          $and: [
            { lastActivity: { $exists: false } },
            {
              createdAt: {
                $lt: Math.floor(new Date(date)),
              },
            },
          ],
        },
      ],
    });
    files.map(async (file, key) => {
      const path = __dirname + "/../" + file.filePath;
      console.log("cleaning...", path);
      let isRemovedFromDirectory = await fileService.deleteFile(path);
      let isRemovedFromDB = await fileService.remove({
        privateKey: file.privateKey,
      });
      if (isRemovedFromDB && isRemovedFromDirectory) {
        console.log(path, "Removed Succesfully");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = cleanup;
