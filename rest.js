const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

//render template
app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

// POST: عرض اسم المستخدم والبريد الإلكتروني
app.post("/sign-up", (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res
      .status(400)
      .json({ error: "يرجى توفير اسم المستخدم والبريد الإلكتروني" });
  }

  // res.json({
  //   message: "تم استقبال البيانات بنجاح",
  //   username,
  //   email,
  // });
  res.render("profile", {
    username,
    email,
  });
});

// GET: معلومات ملف شخصي وهمية
app.get("/me", (req, res) => {
  const fakeProfile = {
    username: "ImadDeveloper",
    email: "imad@example.com",
    age: 22,
    bio: "Full-stack developer متخصص في Next.js",
    location: "الجزائر",
  };

  res.json(fakeProfile);
});

app.listen("3000", () => {
  console.log("server running in port 3000");
});

// متنساش باش تهبط و تنسطالي Node js
// باتشغل مشروع rest دير => npm run start:rest
