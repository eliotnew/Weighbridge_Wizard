const chai = require("chai");
const chaiHttp = require("chai-http");
const accountModel = require("../../models/accountModel");
chai.use(chaiHttp);
const expect = chai.expect;
const app = require("../../app");
let server;

const accountCreate = {
  firstName: "Merlin",
  lastName: "Sorcerer",
  email: "merlin.sourcerer@outlook.com",
  password: "53CuRe&£",
  location: "Camelot",
};

const signIn = {
  email: "merlin.sourcerer@outlook.com",
  password: "53CuRe&£",
};

describe("Accounts Testing", async () => {
  before(async function () {
    server = app.listen(3012); //setup
  });

  after(async function () {
    server.close(); //teardown
  });

  beforeEach(async () => {
    try {
      await accountModel.deleteMany({});
    } catch (error) {
      throw error;
    }
  });
  //---------------------------------------------------------SIGN UP

  it("should successfully sign an account up", async () => {
    const res = await chai
      .request(server)
      .post("/account/signup")
      .send(accountCreate);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property(
      "message",
      "Account created successfully"
    );
    expect(res.body).to.have.property("userId").that.is.a("string");
    expect(res.body).to.have.property("firstName", accountCreate.firstName);
    expect(res.body).to.have.property("lastName", accountCreate.lastName);
    expect(res.body).to.have.property("email", accountCreate.email);
  });

  it("should decline as user already exists", async () => {
    const res = await chai
      .request(server)
      .post("/account/signup")
      .send(accountCreate);

    const res2 = await chai
      .request(server)
      .post("/account/signup")
      .send(accountCreate);

    expect(res2).to.have.status(400);
    expect(res2.body).to.have.property(
      "message",
      "An account with this email already exists, did you mean to sign IN instead?"
    );
  });

  //---------------------------------------------Sign in

  it("should successfully sign an account In", async () => {
    const res = await chai
      .request(server)
      .post("/account/signup")
      .send(accountCreate);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property(
      "message",
      "Account created successfully"
    );
    expect(res.body).to.have.property("userId").that.is.a("string");
    expect(res.body).to.have.property("firstName", accountCreate.firstName);
    expect(res.body).to.have.property("lastName", accountCreate.lastName);
    expect(res.body).to.have.property("email", accountCreate.email);

    const res2 = await chai
      .request(server)
      .post("/account/signin")
      .send(signIn);

    expect(res2).to.have.status(200);
    expect(res2.body).to.have.property("message", "Login successful");
    expect(res2.body).to.have.property("userId").that.is.a("string");
    expect(res2.body).to.have.property("firstName", accountCreate.firstName);
    expect(res2.body).to.have.property("lastName", accountCreate.lastName);
    expect(res2.body).to.have.property("email", accountCreate.email);
  });

  it("should decline sign in due mismatching passwords", async () => {
    const res = await chai
      .request(server)
      .post("/account/signup")
      .send(accountCreate);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property(
      "message",
      "Account created successfully"
    );
    expect(res.body).to.have.property("userId").that.is.a("string");
    expect(res.body).to.have.property("firstName", accountCreate.firstName);
    expect(res.body).to.have.property("lastName", accountCreate.lastName);
    expect(res.body).to.have.property("email", accountCreate.email);

    const signIn = {
      email: "merlin.sourcerer@outlook.com",
      password: "whoops!",
    };

    const res2 = await chai
      .request(server)
      .post("/account/signin")
      .send(signIn);

    expect(res2).to.have.status(401);
    expect(res2.body).to.have.property("message", "Invalid password");
  });

  it("should decline sign in due to no email address found", async () => {
    const signIn = {
      email: "merlin.magician@outlook.com",
      password: "whoops!",
    };

    const res2 = await chai
      .request(server)
      .post("/account/signin")
      .send(signIn);

    expect(res2).to.have.status(404);
    expect(res2.body).to.have.property(
      "message",
      "Account does not exist, did you mean to sign up instead?"
    );
  });

  // //--------------------------------------------------------Change account details functionality

  it("should successfully change an account details", async () => {
    //sign the account up
    const res = await chai
      .request(server)
      .post("/account/signup")
      .send(accountCreate);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property(
      "message",
      "Account created successfully"
    );
    expect(res.body).to.have.property("userId").that.is.a("string");
    expect(res.body).to.have.property("firstName", accountCreate.firstName);
    expect(res.body).to.have.property("lastName", accountCreate.lastName);
    expect(res.body).to.have.property("email", accountCreate.email);

    const theUserID = res.body.userId;

    const accountEdit = {
      firstName: "Gandalf",
      lastName: "Dumbledore",
      email: "wizards.sleeve@microsoft.com",
      password: "53CuRe&£",
      userId: theUserID,
    };

    const res2 = await chai
      .request(server)
      .put("/account/update")
      .send(accountEdit);
    expect(res2.body).to.have.property("userId").that.is.a("string");

    expect(res2).to.have.status(200);
    expect(res2.body).to.have.property(
      "message",
      "Account updated successfully"
    );

    expect(res2.body.userId).to.equal(accountEdit.userId);
    expect(res2.body.firstName).to.equal(accountEdit.firstName);
    expect(res2.body.lastName).to.equal(accountEdit.lastName);
    expect(res2.body.email).to.equal(accountEdit.email);
  });

  // it("should reject changes in the event of wrong password", async () => {
  //   const res = await chai.request(server).post("/signup").send(accountCreate);

  //   expect(res).to.have.status(201);
  //   expect(res.body).to.have.property(
  //     "message",
  //     "Account created successfully"
  //   );
  //   expect(res.body).to.have.property("userId").that.is.a("string");
  //   expect(res.body).to.have.property("foreName", accountCreate.foreName);
  //   expect(res.body).to.have.property("surName", accountCreate.surName);
  //   expect(res.body).to.have.property("email", accountCreate.email);

  //   const billsUserID = res.body.userId;

  //   const accountEdit = {
  //     foreName: "Billy",
  //     surName: "Gatsby",
  //     email: "bill.gates@microsoft.com",
  //     password: "whoops!",
  //     userId: billsUserID,
  //   };

  //   const res2 = await chai
  //     .request(server)
  //     .put("/accountsettings")
  //     .send(accountEdit);

  //   expect(res2).to.have.status(400);
  //   expect(res2.body).to.have.property("message", "Invalid Password");
  // });

  // it("should reject changes in the event of wrong ID", async () => {
  //   const res = await chai.request(server).post("/signup").send(accountCreate);

  //   expect(res).to.have.status(201);
  //   expect(res.body).to.have.property(
  //     "message",
  //     "Account created successfully"
  //   );
  //   expect(res.body).to.have.property("userId").that.is.a("string");
  //   expect(res.body).to.have.property("foreName", accountCreate.foreName);
  //   expect(res.body).to.have.property("surName", accountCreate.surName);
  //   expect(res.body).to.have.property("email", accountCreate.email);

  //   const accountEdit = {
  //     foreName: "Billy",
  //     surName: "Gatsby",
  //     email: "bill.gates@microsoft.com",
  //     password: "53CuRe&£",
  //     userId: "507f1f77bcf86cd799439011",
  //   };

  //   const res2 = await chai
  //     .request(server)
  //     .put("/accountsettings")
  //     .send(accountEdit);

  //   expect(res2).to.have.status(404);
  //   expect(res2.body).to.have.property("message", "Account not found");
  // });

  // //---------------------------------------------------Change Password

  // it("should successfully change password", async () => {
  //   const res = await chai.request(server).post("/signup").send(accountCreate);

  //   expect(res).to.have.status(201);
  //   expect(res.body).to.have.property(
  //     "message",
  //     "Account created successfully"
  //   );
  //   expect(res.body).to.have.property("userId").that.is.a("string");
  //   expect(res.body).to.have.property("foreName", accountCreate.foreName);
  //   expect(res.body).to.have.property("surName", accountCreate.surName);
  //   expect(res.body).to.have.property("email", accountCreate.email);

  //   const billsUserID = res.body.userId;

  //   const passChange = {
  //     password: "53CuRe&£",
  //     newPassword: "3v3N_^m0R3!!53Cure&%",
  //     userId: billsUserID,
  //   };

  //   const res2 = await chai
  //     .request(server)
  //     .put("/changepassword")
  //     .send(passChange);
  //   expect(res2).to.have.status(200);
  //   expect(res2.body).to.have.property(
  //     "message",
  //     "Account password updated successfully"
  //   );
  // });

  // it("should reject on account of password not existing", async () => {
  //   const res = await chai.request(server).post("/signup").send(accountCreate);

  //   expect(res).to.have.status(201);
  //   expect(res.body).to.have.property(
  //     "message",
  //     "Account created successfully"
  //   );
  //   expect(res.body).to.have.property("userId").that.is.a("string");
  //   expect(res.body).to.have.property("foreName", accountCreate.foreName);
  //   expect(res.body).to.have.property("surName", accountCreate.surName);
  //   expect(res.body).to.have.property("email", accountCreate.email);

  //   const billsUserID = res.body.userId;

  //   const passChange = {
  //     password: "whoops!",
  //     newPassword: "3v3N_^m0R3!!53Cure&%",
  //     userId: billsUserID,
  //   };

  //   const res2 = await chai
  //     .request(server)
  //     .put("/changepassword")
  //     .send(passChange);
  //   expect(res2).to.have.status(404);
  //   expect(res2.body).to.have.property("message", "Invalid Password");
  // });

  // it("should reject on account of ID wrong not existing", async () => {
  //   const res = await chai.request(server).post("/signup").send(accountCreate);

  //   expect(res).to.have.status(201);
  //   expect(res.body).to.have.property(
  //     "message",
  //     "Account created successfully"
  //   );
  //   expect(res.body).to.have.property("userId").that.is.a("string");
  //   expect(res.body).to.have.property("foreName", accountCreate.foreName);
  //   expect(res.body).to.have.property("surName", accountCreate.surName);
  //   expect(res.body).to.have.property("email", accountCreate.email);

  //   const passChange = {
  //     password: "53CuRe&£",
  //     newPassword: "3v3N_^m0R3!!53Cure&%",
  //     userId: "507f1f77bcf86cd799439011",
  //   };

  //   const res2 = await chai
  //     .request(server)
  //     .put("/changepassword")
  //     .send(passChange);
  //   expect(res2).to.have.status(500);
  // });

  // //--------------------------------------------------------------------DELETE ACCOUNT
  // it("should successfully sign an account up", async () => {
  //   const res = await chai.request(server).post("/signup").send(accountCreate);

  //   expect(res).to.have.status(201);
  //   expect(res.body).to.have.property(
  //     "message",
  //     "Account created successfully"
  //   );
  //   expect(res.body).to.have.property("userId").that.is.a("string");
  //   expect(res.body).to.have.property("foreName", accountCreate.foreName);
  //   expect(res.body).to.have.property("surName", accountCreate.surName);
  //   expect(res.body).to.have.property("email", accountCreate.email);

  //   const billsUserID = res.body.userId;

  //   const passChange = {
  //     password: "53CuRe&£",
  //     userId: billsUserID,
  //   };

  //   const res2 = await chai
  //     .request(server)
  //     .delete("/deleteaccount")
  //     .send(passChange);
  //   expect(res2).to.have.status(204);
  // });

  // it("should reject for invalid password", async () => {
  //   const res = await chai.request(server).post("/signup").send(accountCreate);

  //   expect(res).to.have.status(201);
  //   expect(res.body).to.have.property(
  //     "message",
  //     "Account created successfully"
  //   );
  //   expect(res.body).to.have.property("userId").that.is.a("string");
  //   expect(res.body).to.have.property("foreName", accountCreate.foreName);
  //   expect(res.body).to.have.property("surName", accountCreate.surName);
  //   expect(res.body).to.have.property("email", accountCreate.email);

  //   const billsUserID = res.body.userId;

  //   const passChange = {
  //     password: "whoops",
  //     userId: billsUserID,
  //   };

  //   const res2 = await chai
  //     .request(server)
  //     .delete("/deleteaccount")
  //     .send(passChange);
  //   expect(res2).to.have.status(400);
  //   expect(res2.body).to.have.property("message", "Invalid Password");
  // });

  // it("should reject for invalid ID", async () => {
  //   const res = await chai.request(server).post("/signup").send(accountCreate);

  //   expect(res).to.have.status(201);
  //   expect(res.body).to.have.property(
  //     "message",
  //     "Account created successfully"
  //   );
  //   expect(res.body).to.have.property("userId").that.is.a("string");
  //   expect(res.body).to.have.property("foreName", accountCreate.foreName);
  //   expect(res.body).to.have.property("surName", accountCreate.surName);
  //   expect(res.body).to.have.property("email", accountCreate.email);

  //   const passChange = {
  //     password: "53CuRe&£",
  //     userId: "507f1f77bcf86cd799439011",
  //   };

  //   const res2 = await chai
  //     .request(server)
  //     .delete("/deleteaccount")
  //     .send(passChange);
  //   expect(res2).to.have.status(404);
  // });
});
