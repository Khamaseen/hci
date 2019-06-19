const auth = require('../middleware-auth.js');

//the auth function checks the header for the right token.. 
router.get('/api/', auth, async (req, res) => {

    const token = req.header('x-auth-token');

});