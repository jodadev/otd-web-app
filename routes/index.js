const express = require('express');
const router = express.Router();
const otd = require('../api/otd');

router.get('/', (req, res) => {res.render('index')})

router.post('/cipher', (req, res) => {
    const cipher = otd.Cipher(req.body.text);
    if(cipher)
        res.status(200).json(cipher);
    else
        res.status(500).json({error: 'Something went wrong, please \'Reset\' and try again'});
})
router.post('/decipher', (req, res) => {
    const deciphered = otd.Decipher(req.body.text, req.body.key);
    if(deciphered)
        res.status(200).json(deciphered);
    else
        res.status(500).json({error: 'Something went wrong, please \'Reset\' and try again'});
})

module.exports = router;