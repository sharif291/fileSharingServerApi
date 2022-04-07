// Setting up the env variables depend on the node environment
const envConfig = async () => {
  // const node_env = process.env.NODE_ENV;
  process.env.PORT = process.env.PORT;
  process.env.mongoUrl = process.env.MONGOURL;
  process.env.FOLDER = process.env.FOLDER;
  process.env.DAILYDOWNLOADLIMIT = process.env.DAILYDOWNLOADLIMIT;
  process.env.DAILYUPLOADLIMIT = process.env.DAILYUPLOADLIMIT;
  process.env.INACTIVEFOR = process.env.INACTIVEFOR;
  process.env.PROVIDER = process.env.PROVIDER || "local";
};

module.exports = envConfig;
