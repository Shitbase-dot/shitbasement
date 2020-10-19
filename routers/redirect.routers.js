const {Router} = require('express')
const Link = require('../models/Links')
const router = Router()

module.exports = router

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code })

        if(link) {
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }

        res.status(404).json('Link have not find')
    } catch (e) {
        res.status(500).json({message: 'Something going wrong, will try later'});
    }
})