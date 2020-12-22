const router = require('express').Router();
const Buku = require('../controllers/Buku');
router.get('/', Buku.findAll);
router.post('/', Buku.create);
router.get('/:id', Buku.findById);
router.put('/:id', Buku.update);
router.delete('/delete', Buku.deleteAll);
router.delete('/:id', Buku.deleteById);
module.exports = router;