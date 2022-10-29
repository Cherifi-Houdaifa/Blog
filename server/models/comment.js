const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    text: { type: Schema.Types.String, required: true },
});

module.exports = model('Comment', commentSchema);
