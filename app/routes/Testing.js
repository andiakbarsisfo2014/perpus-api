const router = require('express').Router();
const Testing = require('../controllers/Testing');
router.get('/', Testing.findAll);
// router.post('/', Buku.create);
// router.get('/:id', Buku.findById);
// router.put('/:id', Buku.update);
// router.delete('/delete', Buku.deleteAll);
// router.delete('/:id', Buku.deleteById);
module.exports = router;