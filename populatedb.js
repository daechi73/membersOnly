#! /usr/bin/env node

console.log("This script populates Users and comments to the database");
//mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.fqbeltr.mongodb.net/membersOnly?retryWrites=true&w=majority
// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const bcrypt = require("bcryptjs");
const Comment = require("./models/comment");
const User = require("./models/user");

const comments = [];
const users = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(
  index,
  first_name,
  last_name,
  date_created,
  user_name,
  password,
  status
) {
  const user = new User({
    first_name: first_name,
    last_name: last_name,
    date_created: date_created,
    user_name: user_name,
    password: await hashedPass2(password),
    //password: password,          // for no bcrypt
    status: status,
  });
  await user.save();
  users[index] = user;
  console.log(`added user: ${user.first_name} ${user.last_name}`);
}

async function commentCreate(index, user, date_added, comment) {
  const commentObj = new Comment({
    user: user,
    date_added: date_added,
    comment: comment,
  });
  await commentObj.save();
  comments[index] = commentObj;
  console.log(`added comment from ${user.user_name}`);
}

async function hashedPass(password) {
  const result = await new Promise((res, rej) => {
    bcrypt.hash(password, 10, (err, hashedPass) => {
      res(hashedPass);
    });
  });
  return result;
}
async function hashedPass2(password) {
  const result = await bcrypt.hash(password, 10);
  return result;
}

async function createUsers() {
  console.log("adding Users");
  await Promise.all([
    userCreate(
      0,
      "James",
      "Harden",
      "2023-10-20",
      "JH34@hotmail.com",
      "123456789",
      "Starter"
    ),

    userCreate(
      1,
      "Michael",
      "Belstie",
      "2023-10-21",
      "MB124@hotmail.com",
      "123456789",
      "Intermediate"
    ),

    userCreate(
      2,
      "Beth",
      "Eli",
      "2022-11-20",
      "JH34@hotmail.com",
      "123456789",
      "VIP"
    ),

    userCreate(
      3,
      "Victor",
      "Lebroski",
      "2023-04-10",
      "JH21@hotmail.com",
      "123456789",
      "VIP"
    ),
  ]);
}

async function createComments() {
  console.log("creating Comments..");
  console.log(users);
  await Promise.all([
    commentCreate(0, users[0], "1992-04-12", "Th1$ iS $o MucH FuN!"),
    commentCreate(2, users[1], "1992-04-12", "I agree with you!"),
    commentCreate(3, users[2], "1992-04-12", "I dont !!"),
    commentCreate(
      4,
      users[3],
      "1992-04-12",
      "One day I will eat a cheese Pizza!"
    ),
    commentCreate(5, users[1], "1992-04-12", "This is only for the members!"),
    commentCreate(6, users[2], "1992-04-12", "nuf hcum os si siht!"),
  ]);
}
