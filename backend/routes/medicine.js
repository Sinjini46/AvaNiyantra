const express = require('express')
const medicine = require('../models/medicine')
const { request } = require('express')
const router = express.Router()

router.post('/add', async(req, res) => {
    const json = {
        id: req.body.id,
        name: req.body.name,
        level: req.body.level,
        quantity: req.body.quantity
    }
    a = await new medicine(json)

    try {
        const b = await a.save()
        res.json({ msg: b }).status(201)
    } catch (e) {
        res.json({ msg: e }).status(500)
    }
})

router.post('/delete', async(req, res) => {
    medicine.findByIdAndDelete(req.body._id, (err, data) => {
        if (err) {
            res.json({ msg: 'error' })
        } else {
            res.json({ msg: 'done', data: data })
        }
    })
})

router.post('/update', async(req, res) => {
    medicine.findByIdAndUpdate(req.body._id, req.body, (err, data) => {
        if (err) {
            res.json({ msg: err })
        } else {
            res.json({ msg: "done" })
        }
    })
})

router.post('/', async(req, res) => {
    const a = await medicine.find({ id: req.body.id })
    res.json({ msg: "done", data: a })
})

// router.post('/get_med_buId', async(req, res) => {
//     medicine.findById(req.body.id, (err, docs) => {
//         if (err) {
//             res.json({ msg: "error" })
//         } else {
//             res.json({ msg: "done", data: docs })
//         }
//     })
// })
module.exports = router;