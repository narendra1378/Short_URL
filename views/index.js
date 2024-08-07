const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');  // Corrected import statement
const { checkForAuthentication, restrictTo } = require('./middleware/auth');

const { connectMongoDB } = require("./connection");

const URL = require("./models/url");

const urlRoutes = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require('./routes/user');


const app = express();
const Port = 8001;

connectMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("database connected"))
  .catch((err) => console.log("MongoDB error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  // Corrected function call
app.use(checkForAuthentication);

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});

  allUrls.forEach(url => {
    if (url.visitHistory) {
      url.visitHistory = url.visitHistory.map(visit => {
        visit.formattedTimestamp = new Date(visit.timestamp).toLocaleString();
        return visit;
      });
    }
  });
  return res.render("home", {
    urls: allUrls,
  });
});

app.use("/url", restrictTo(["Normal"]),urlRoutes);
app.use('/', staticRoute);
app.use("/user", userRoute);


app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(8001, () => console.log(`server started at ${Port}`));
