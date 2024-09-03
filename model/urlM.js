const mongoose = require('mongoose');

const urlSchema = mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        originalUrl: {
            type: String,
            required: true,
        },
        visithistory: [{timestamp: {type: Number}}],
    },
    {timestamps: true}
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;