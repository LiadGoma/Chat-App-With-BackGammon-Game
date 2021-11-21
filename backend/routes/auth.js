const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");


router.post('/', async (req, res) => {

    //  const { error } = validate(req.body);
    //  if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send("Invalid email or password");

    const token= jwt.sign({id:user.id, email:user.email, name:user.name}, "privateKey");
    res.send(token);
});

module.exports = router;
