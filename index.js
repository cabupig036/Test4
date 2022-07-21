const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");


const ImageRouter = require("./routes/images");
const userRoute = require("./routes/users");
const shipperRoute = require("./routes/shipper");
const blogRoute = require("./routes/blog");
const staffRoute = require("./routes/staff");
const supportRoute = require("./routes/support");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const blackListRoute = require("./routes/blacklist");
const oderRoute = require("./routes/oder");
const resetPwdRouter = require("./routes/resetPwd");

const port = process.env.PORT || 3000;
const portSocket = process.env.PORTSOCKET || 8800;

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//APIs Info User

//APIs Login/Register Account
app.use(
    cors({
        origin: "*",
    })
);

app.use("/api/users", userRoute);
app.use("/api/shipper", shipperRoute);
app.use("/api/blog", blogRoute);
app.use("/api/staff", staffRoute);
app.use("/api/support", supportRoute);
app.use("/api/auth", authRoute);
app.use("/api/blacklist", blackListRoute);
app.use("/api/oder", oderRoute);
app.use("/api/resetpwd", resetPwdRouter);
app.use("/api/image", ImageRouter);

var server = app.listen(port, () => {
    console.log("Backend server is running!");
    console.log("localhost:" + port);
});
let adminId = [];
let clientId = [];
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
let users = [];
const addUser = (gmail, socketId) => {
    !users.some((user) => user.gmail === gmail) &&
        users.push({ gmail, socketId });
};
io.on("connection", (socket) => {
    console.log("user-connect");
    socket.on("admin-connect", () => {
        if (!adminId.includes(socket.id)) {
            adminId.push(socket.id);
        }
    });
    socket.on("clientChat", () => {
        console.log("push-to-admin");
        if (!clientId.includes(socket.id)) {
            clientId.push(socket.id);
        }
        adminId.map((element) => {
            socket.to(element).emit("forwardToAdmin", "hello");
        });
    });
    socket.on("adminChat", () => {
        console.log("push-to-client");
        clientId.map((element) => {
            console.log("emit to client");
            socket.to(element).emit("newMessageFromAdmin", "hello");
        });
    });
});