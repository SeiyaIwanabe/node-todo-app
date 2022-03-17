const mongoose = require('mongoose');

const TaskScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'requierd task name'],
        trim: true,
        maxlength: [20, 'in 20 length'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Task', TaskScheme);
