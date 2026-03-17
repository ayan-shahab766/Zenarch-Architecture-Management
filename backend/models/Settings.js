const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            default: 'hello@zenarch.com'
        },
        whatsapp: {
            type: String,
            required: true,
            default: '+1234567890'
        },
        address: {
            type: String,
            required: true,
            default: '123 Luxury Avenue, Design District, NY 10001'
        },
        instagram: {
            type: String,
            default: "",
        },

        facebook: {
            type: String,
            default: "",
        },

        linkedin: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
