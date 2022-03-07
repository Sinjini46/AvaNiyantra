const express = require('express')
const pharma = require('../models/pharma')
const { request } = require('express')
const router = express.Router()

router.post('/add', async(req, res) => {
    const json = {
        recp_id: req.body.id,
        name: req.body.name,
        contact_number: req.body.contact_number,
        doc_name: req.body.doc_name,
        doc_reg: req.body.doc_reg,
        med_details: req.body.med_details
    }

    const a = await new pharma(json)

    try {
        const b = await a.save()
        res.json({ msg: 'done', data: b })
    } catch (e) {
        res.json({ msg: 'err', data: e })
    }
})

module.exports = router