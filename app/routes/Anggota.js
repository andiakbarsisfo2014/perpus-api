const router = require('express').Router();
const Anggota = require('../controllers/Anggota');

router.get('/', Anggota.findAll);
router.post('/', Anggota.create);
router.get('/:id', Anggota.findById);
router.put('/:id', Anggota.update);
router.delete('/:id', Anggota.deleteById);
router.delete('/delete', Anggota.deleteAll);

module.exports = router;