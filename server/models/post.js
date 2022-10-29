const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: { type: Schema.Types.String, required: true, maxLength: 300 },
    text: { type: Schema.Types.String, required: true },
    dateCreated: { type: Schema.Types.Date, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = model('Post', postSchema);
