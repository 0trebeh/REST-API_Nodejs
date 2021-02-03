const { Router } = require('express');

const router = new Router();

router.get('/Home', (req, res) => {
    const data = {
        name: 'Heberto',
        website: 'heberto.com'
    };
    res.json(data);
});  

module.exports = router;
