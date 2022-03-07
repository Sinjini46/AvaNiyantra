const express = require('express')
const batch = require('../models/batch')
const user = require('../models/user')
const parcel = require('../models/parcel')
const medicine = require('../models/medicine')
const { request } = require('express')
const router = express.Router()

router.post('/create_batch', (req, res) => {
    const json = {
        sender_id: req.body.sender_id,
        sender_name: req.body.name,
        receiver_id: req.body.receiver_id,
        parcel_id: req.body.parcel_id,
        status: 0
    }

    a = new batch(json)

    try {
        b = a.save()

        parcel.find({ parcel_id: req.body.parcel_id }, (err, docs) => {
            if (err) {
                res.json({ msg: "error" })
                return
            } else {
                for (i = 0; i < docs.length; i++) {
                    var dat = docs[i]
                    medicine.findById(dat.med_id, (e, d) => {

                        if (!e) {
                            new_med = {
                                id: req.body.receiver_id,
                                name: d.name,
                                level: d.level,
                                quantity: dat.quantity,
                                parent: d._id
                            }
                            const f = d.quantity - dat.quantity
                            medicine.findByIdAndUpdate(d._id, { quantity: f }, (err, data) => {})
                                // console.log(d._id, d.quantity, new_med.quantity, f)
                            a = new medicine(new_med)
                            try {
                                b = a.save()
                            } catch (e) {
                                res.json({ msg: "error", data: e })
                                return
                            }
                        }
                    })
                }
            }
        })


        res.json({ msg: "done", data: b })
    } catch (e) {
        res.json({ msg: "error", data: e })
    }
})

router.post('/get_recv', async(req, res) => {
    batch.find({ receiver_id: req.body.receiver_id }, (err, docs) => {
        if (err) {
            res.json({ msg: "error" })
        } else {
            res.json({ msg: "done", data: docs })
        }
    })
})

module.exports = router