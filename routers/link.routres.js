

const {Router} = require('express')
const Link = require('../models/Links')
const router = Router()
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = shortid.generate()
        const existing = await Link.findOne({from})

        if(existing) {
            return res.json({ link: existing })
        }

        const to = baseUrl + '/t/' + code;
        console.log('to', to)
        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        console.log('==============================')
        console.log('link', link)
        await link.save()
        // fo
       res.status(201).json({link}) 
        
    } catch (e) {
        res.status(500).json({message: 'Something going wrong, will try later'});
    }
})

router.get('/', auth, async (req, res) => {
    try {
        console.log('yo')
        const links = await Link.find({ owner: req.user.userId })
        console.log('shit')
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Something going wrong, will try later'});
    }
})

router.get('/:id', async (req, res) => {
    console.log('hi')
    try {
        const links = await Link.findById(req.params.id)
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Something going wrong, will try later'});
    }
})

module.exports = router