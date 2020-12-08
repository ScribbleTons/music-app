let mongoose = require("mongoose");
const {
    doc
} = require("prettier");
let musicSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    music: {
        type: Object,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});
musicSchema.pre('saving...', function(doc) {
    console.log("About to save ... " + doc._id)
});

musicSchema.post("Saved...", function(doc) {
    console.log("if you see me, everything is good with schema " + doc._id)
});
let Music = mongoose.model("Music", musicSchema);
module.exports = Music;