const express = require('express');
const User = require('../model/user');
exports.signup = async(req,res,next) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).send("All fields are required!");
        }

        const newUser = await User.create({
            name, email, password
        })

        res.status(201).json({
            success: true,
            newUser
        })
        next();
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}
exports.signin = async(req,res,next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("All fields are required!");
        }

        const existingUser = await User.findOne({
            email
        })

        if(!existingUser){
            return res.status(400).json({
                message: "invalid credentials"
            })
        }

        res.status(201).json({
            success: true,
            existingUser
        })
        next();
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}