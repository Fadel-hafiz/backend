const express = require('express');
const router = require('./routes/UserRoute');
const app = new express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');

app.use(bodyParser.json());

const URI = "http://localhost/phpmyadmin/index.php?route=/database/structure&db=auth_db";
mysql.connect(URI,
    err => {
        if(err) throw err;
        console.log('connected to mysqlDB')
    });


app.use('/user', express.static('public/images'))

app.use("/api/v1", router);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(418).json({
            err_code: err.code,
            err_message: err.message,
        });
    } else {
        return res.status(500).json({
            err_code: err.code,
            err_message: "Something went wrong"
        });
    }
});

app.use('*', (req, res)=>{
    res.status(404).json({ status:"fail", data:"Not Found" })
});

module.exports = app;