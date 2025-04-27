const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const appRoutes = require("./routes/appRoutes");

const app = express();
const PORT = require("./config").PORT;
const helmet = require('helmet');
app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(cors());
app.use(bodyParser.json());
app.use("/api", appRoutes);

app.listen(2354, '192.168.1.187', () => {
  console.log('Server running on http://192.168.1.187:2354');
});
