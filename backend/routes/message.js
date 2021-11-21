const { Message } = require('../models/message');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const newMessage = new Message({
        members: [req.body.senderId, req.body.recieverId],
        senderId: req.body.senderId,
        text: req.body.text,
        createdAt: Date.now()
    });
    newMessage.save();
    res.send(newMessage);
});
router.get("/:senderId/:recieverid", async (req, res) => {

    try {
        console.log("5555555");
        const messages1 = [];
        const messages2 = [];

        await Message.find({
            members: [req.params.senderId, req.params.recieverid]
        }).then((data) => {
            messages1.push(...data);
        })
        await Message.find({
            members: [req.params.recieverid, req.params.senderId]
        }).then((data) => {
            messages2.push(...data);
        })
        const messages3=[...messages1, ...messages2];
        messages3.sort((a,b)=>a.createdAt-b.createdAt);
        res.send(messages3);


        // const messss = await Message.map(mesa => {
        //     if (mesa.members.contains())
        //         return mesa;

        // }
        // )

        // const messages1 =  await Message.find({ members:{ $in: [req.params.recieverid, req.paramas.senderId] } });
        // console.log(messages1);
        // const messages2 = await Message.find({ members: [req.params.recieverId, req.params.senderId] });
        // const messages3 = [...messages1, ...messages2];
        // console.log(messages1);
        // console.log("______________");
        // console.log(messages2);
        // console.log("-546456565");
        // console.log(messages3);

        // console.log(messages1);
        // console.log(messages2);


    } catch (ex) {
        // res.status(400)(ex);
    }
})

module.exports = router;
