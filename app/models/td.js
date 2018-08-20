const mongoose = require('mongoose')
const tdSchema = new mongoose.Schema({
    listItems: [{ title: String, content: String, isFinish: Boolean }],
    relTime: String,
    time: { type: Date, default: Date.now, }
})
module.exports = mongoose.model('todolist', tdSchema);