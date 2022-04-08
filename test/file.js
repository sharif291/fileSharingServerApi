var request = require("supertest");
var app = require("../index.js");

let publicKey;
let privateKey;

// Test upload file endpoint
describe("POST /files", () => {
  it("file upload endpoint", (done) => {
    request(app)
      .post("/files")
      .attach("file", "./test/files/test image 1.jpg")
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log("error response: ", res._body);
          return done(err);
        }
        publicKey = res._body.data.publicKey;
        privateKey = res._body.data.privateKey;
        done();
      });
  });
});

// Test download file endpoint
describe("Get /files", () => {
  it("file download endpoint", (done) => {
    request(app)
      .get(`/files?publicKey=${publicKey}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log("error response", res._body);
          return done(err);
        }
        done();
      });
  });
});

// Test delete file endpoint
describe("Delete /files", () => {
  it("file delete endpoint", (done) => {
    request(app)
      .delete(`/files?privateKey=${privateKey}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log("error response", res._body);
          return done(err);
        }
        done();
      });
  });
});
