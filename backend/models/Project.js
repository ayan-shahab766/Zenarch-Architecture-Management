const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        location: {
            type: String,
            required: true,
        },
        area: {
            type: String,
        },
        year: {
            type: String,
        },
        coverImage: {
            type: String,
            required: true,
        },
        gallery: [
            {
                type: String,
            },
        ],
        architect: {
            type: String,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
