var Bebida = require('../models/bebida');
var debug = require('debug')('blog:bebida_controller');

// Search a one bebida y database
module.exports.getOne = (req, res, next) => {
    debug("Search Bebida", req.params);
    Bebida.findOne({
            nombre: req.params.nombre
        }, "-distribuidora -login_count")
        .then((foundBebida) => {

            if (foundBebida)
                return res.status(200).json(foundBebida);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Usert List", {
        size: perPage,
        page,
        sortby: sortProperty,
        sort
    });

    Bebida.find({}, "-distribuidora -login_count")
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            [sortProperty]: sort
        })
        .then((bebidas) => {
            debug("Found bebidas", bebidas);
            return res.status(200).json(bebidas)
        }).catch(err => {
            next(err);
        });

}

// New Bebida

module.exports.register = (req, res, next) => {
    debug("New Bebida", {
        body: req.body
    });
    Bebida.findOne({
            nombre: req.body.nombre
        }, "-distribuidora -login_count")
        .then((foundBebida) => {
            if (foundBebida) {
                debug("Bebida duplicado");
                throw new Error(`Bebida duplicado ${req.body.nombre}`);
            } else {
                let newBebida = new Bebida({
                    nombre: req.body.nombre,
                    tipo_bebida: req.body.tipo_bebida || "",
                    precio: req.body.precio || "",
                    id_bebida: req.body.id_bebida,
                    distribuidora: req.body.distribuidora /*TODO: Modificar, hacer hash del password*/
                });
                return newBebida.save();
            }
        }).then(bebida => {
            return res
                .header('Location', '/bebidas/' + bebida._id)
                .status(201)
                .json({
                    nombre: bebida.nombre
                });
        }).catch(err => {
            next(err);
        });
}


// Update bebida

module.exports.update = (req, res, next) => {
    debug("Update bebida", {
        nombre: req.params.nombre,
        ...req.body
    });

    let update = {
        ...req.body
    };

    Bebida.findOneAndUpdate({
            nombre: req.params.nombre
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

module.exports.delete = (req, res, next) => {

    debug("Delete bebida", {
        nombre: req.params.nombre,
    });

    Bebida.findOneAndDelete({ nombre: req.params.nombre })
        .then((data) => {
            if (data) res.status(200).json(data);
            else res.status(404).send();
        }).catch(err => {
            next(err);
        })
}