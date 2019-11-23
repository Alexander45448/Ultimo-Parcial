const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BebidaSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    tipo_bebida: String,
    precio: Number,
    id_bebida: {
        type: Number,
        required: true
    },
    distribuidora: {
        type: String,
        required: true
    },
    login_count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model("Bebida", BebidaSchema);