const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/AuthRouter");
const EventRouter = require("./Routes/EventRouter");

dotenv.config();
require("./Models/database");

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", AuthRouter);
app.use("/events", EventRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
