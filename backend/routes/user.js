const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



router.get('/', async (req, res) => {
    let users = await User.find();
    users = users.map((user) => {
        return {
            _id: user.id,
            name: user.name,
            email: user.email
        }
    })
    res.send(users);
})
router.post('/', async (req, res) => {
    //  const { error } = validate(req.body);
    //  if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("email already registered");


    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(user.password, salt);
    user.password = pass;

    await user.save()


    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, "privateKey");

    res.header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        .send({
            id: user.id,
            name: user.name,
            email: user.email
        });
});

module.exports = router;
