import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@project.com",
    password: bcrypt.hashSync("P@ssword1", 10),
    isAdmin: true,
  },
  {
    name: "Test User1",
    email: "test1@gmail.com",
    password: bcrypt.hashSync("P@ssword1", 10),
  },
  {
    name: "Test User2",
    email: "test2@gmail.com",
    password: bcrypt.hashSync("P@ssword1", 10),
  },
];

export default users;
