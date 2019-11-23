var express = require('express');
var router = express.Router();
var BebidaController = require('../controllers/BebidaController')

/* GET users listing. */
router.get('/:nombre', BebidaController.getOne);
router.get('/', BebidaController.getAll);

router.post('/', BebidaController.register);
router.put('/:nombre', BebidaController.update);
router.delete('/:nombre', BebidaController.delete);

module.exports = router;