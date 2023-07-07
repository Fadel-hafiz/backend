import User from "../models/UserModel.js";
import argon2 from "argon2";
import fs from "fs";
import path from "path";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'nik', 'name', 'avatar', 'email', 'position', 'gender']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'nik', 'name', 'avatar', 'email', 'position', 'gender'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) =>{
    const {nik, name, avatar, email, password, confPassword, position, gender} = req.body;
    if(password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password Tidak Cocok" });
    const hashPassword = await argon2.hash(password);

    if (!req.files || req.files.length === 0)
    return res.status(400).json({ msg: "No File Uploaded" });

    const files = {};
    for (let file of req.files) {
    files[file.fieldname] = file.filename;
  }

    try {
    const data = await User.create({
            nik: nik,
            name: name,
            email: email,
            password: hashPassword,
            position: position,
            gender: gender,
            ...files,
        });
        res.status(201).json({ msg: "User Created Successfully", data });
    } catch (error) {
        console.log({msg: error.message});
    }

}

export const updateUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
    const {nik, name, email, password, confPassword, position, gender} = req.body;
    let hashPassword;
    if(!password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password Tidak Cocok" });
    try {
        await User.update({
            nik: nik,
            name: name,
            email: email,
            password: hashPassword,
            position: position,
            gender: gender
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Updated Successfully" });
    } catch (error) {
        console.log({msg: error.message});
    }

    const files = {};
    for (let file of req.files) {
    files[file.fieldname] = file.filename;
  }
}

export const deleteUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Deleted Successfully" });
    } catch (error) {
        console.log({msg: error.message});
    }
}
// if(req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    // const name = req.body.title;
    // const file = req.files.file;
    // const fileSize = file.data.length;
    // const ext = path.extname(file.name);
    // const fileName = file.md5 + ext;
    // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    // const allowedType = ['.png','.jpg'];
    // if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image" });
    // if(fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    // file.mv(`./public/images/${fileName}`, async(err)=>{
    //     if(err) return res.status(500).json({ msg: err.message });
    //     try {
    //         await User.create({
    //             nik: nik, 
    //             name: name, 
    //             avatar: fileName, 
    //             email: email,
    //             password: hashPassword,
    //             position: position,
    //             gender: gender
    //         });
    //         res.status(201).json({ msg: "User Created Successfully" });
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // })