import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import multer from "multer";
dotenv.config();

const app = express('./app');

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db : db
});

app.use(express.static("public"));
// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store : store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, function(){
    console.log("Server Up and Running...");
});

// const {nik, name, avatar, email, password, confPassword, position, gender} = req.body;
// if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password Tidak Cocok"});
// const hashPassword = await argon2.hash(password);
// try {
//     await User.create({
//         nik: nik,
//         name: name,
//         avatar: avatar,
//         email: email,
//         password: hashPassword,
//         position: position,
//         gender: gender
//     });
//     res.status(201).json({msg: "Register Berhasil"}); 
// } catch (error) {
//     res.status(400).json({msg: error.message});
// }