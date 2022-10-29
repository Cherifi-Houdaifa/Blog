const { Schema, model } = require('mongoose');

const authorSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
});

module.exports = model('Author', authorSchema);
