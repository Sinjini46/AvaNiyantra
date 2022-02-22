const express = require('express')
const bcrypt = require('bcrypt')
const user = require('../models/user')
const { request } = require('express')
const router = express.Router()

async function save_user(req, res) {
    const hash_password = await bcrypt.hash(req.body.password, 3)
    const json = {
        name: req.body.name,
        catagory: req.body.catagory,
        reg: req.body.registration,
        email: req.body.email,
        password: hash_password
    }
    const a = await new user(json)

    try {
        const b = await a.save()
        res.json({ msg: b }).status(201)
    } catch (e) {
        res.json({ msg: e }).status(500)
    }
}

router.post('/createuser', async(req, res) => {
    user.findOne({ email: req.body.email }, async(err, result) => {
        if (err) {
            res.json({ msg: err })
        } else {
            if (!result) {
                save_user(req, res)
            } else {
                res.json({ msg: "An account with same email is present" })
            }
        }
    })
})

router.post('/authenticate', async(req, res) => {
    user.findOne({ email: req.body.email }, async(err, result) => {
        if (err) {
            res.json({ msg: err })
        } else {
            if (!result) {
                res.json({ msg: "email id is not registered" })
            } else {
                if (await bcrypt.compare(req.body.password, result.password)) {
                    res.json({ msg: "Login successful" })
                } else {
                    res.json({ msg: "Password not match" })
                }
            }
        }
    })
})

module.exports = router;