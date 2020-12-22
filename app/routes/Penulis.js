const router = require('express').Router();
const Penulis = require('../controllers/Penulis');

router.get('/', Penulis.findAll);
router.post('/', Penulis.create);
router.get('/:id', Penulis.findById);
router.put('/:id', Penulis.update);
router.delete('/:id', Penulis.deleteById);
router.delete('/delete', Penulis.deleteAll);

module.exports = router;