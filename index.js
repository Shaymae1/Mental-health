const express = require("express");
const db = require("../backend/routes/db-config");
const app = express();
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 5000;
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());
db.connect((err) =>{
    if (err) throw err;
})
app.use("/", require("../backend/routes/pages"));
app.use("/api", require("../backend/controllers/auth"));
app.listen(PORT);
