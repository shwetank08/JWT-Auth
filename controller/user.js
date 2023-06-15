const express = require('express');
const User = require('../model/user');
exports.signup = async(req,res) => {
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
            message: "Task added successfully",
            newUser
        })
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}