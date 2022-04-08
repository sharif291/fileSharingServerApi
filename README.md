# fileSharingServerApi
### This project was built as an assesment task from MeldCX.
###### Thanks for such an effective assesment task. I have learned some new things and best practices that will help me a lot in my future development journey.
###### For me the most important part from this assesment test was unit test and integration test and wrap each of the block of code with comments.




# Features that are not implemented
  **1.Google Cloud Service:**
        -sorry for not to implement this featurs. But i have learned how to implement the GCS(Google Cloud Storage) with express.js.
        -I can't implement this because of i dont have any Credit Card. so I couldn't buy the free tier also.

   ##### Research that i think about implement GCS in node.js:
   
    1.we will need to import storage from the module
      const {Storage} = require('@google-cloud/storage');
      
    2. Create a new instance of storage
      const storage = new Storage({
        keyFilename: serviceKey,
        projectId: 'project id',
      })
      
    3.Create a function that will upload the file to bucket and return the path
      async function uploadFile() {
        await storage.bucket(bucketName).upload(filePath, {
          destination: destFileName,
        });
      return `https://storage.googleapis.com/${bucketName}/${destFileName}`;
     }
    4.Create a function that will delete the file from the bucket
      async function deleteFile() {
        await storage.bucket(bucketName).file(fileName).delete();
      }
    
   **2.Unit Testing:**
          -I have implemented the integration testing for all the API Endpoints. But couldn't implement the unit test.
          -I dont have any previous knowledge on unit testing.
          -I have learned the testing and implemented as much as i can.
          -All the resources available at online platform related to tesing is bit confusing between Unit test and Integration Test.
  # Install
  npm install
  # Run
  npm start
  # Test
  npm test
  # REST API
  
  # Upload File
  ### Request
  POST {base Url}/files
  ### Response
      {
        "status": 200,
        "success": "success",
        "message": "Upload Succesfull",
        "data": {
            "publicKey": "fa705f31905e894f19e396f9baa6ba7b12043dcd5e91094b",
            "privateKey": "97e1526457ada5b5c5e5f884a710842791cd4137c08a5fa9"
        }
      }
  ### Error Response
  ###### No file in post body
      {
        "status": 500,
        "success": "failled",
        "message": "No File Uploaded",
        "data": null
      }
  ###### Bad Request or Any error
      {
        "status": 400,
        "success": "failled",
        "message": "Something Went Wrong",
        "data": null
      }
  
  # Download File
  ### Request
  GET /files?publicKey=your-key
  ### Response
      status 200
      file-type:MIME
  ### Error Response
  ###### No file available in the directory
      {
        "status": 209,
        "success": "failled",
        "message": "No such file with the public key",
        "data": null
      }
  # Delete File
  ### Request
  DELETE /files?privateKey=your-key
  ### Response
      {
        "status": 200,
        "success": "success",
        "message": "File Deleted Succesfully",
        "data": null
      }
  ### Error Response
  ###### No file available in the directory
      {
        "status": 209,
        "success": "failled",
        "message": "No content Available",
        "data": null
      }
      
