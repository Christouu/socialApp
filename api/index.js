const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const multer = require("multer");
const path = require("path");

dotenv.config();

const uri = process.env.MONGO_URL;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

app.use("/images", express.static(path.join(__dirname, "public/images")));
//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//multer is for storing imgs adn pictures in DB. Don't store imgs and pics in monoDb this is just for learning.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(8802, () => console.log("Running server on port 8802"));
