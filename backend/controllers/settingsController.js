const Settings = require('../models/Settings');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();

        // If no settings exist, create defaults
        if (!settings) {
            settings = await Settings.create({});
        }

        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
  try {

    const {
      email,
      whatsapp,
      address,
      instagram,
      facebook,
      linkedin
    } = req.body;

    let settings = await Settings.findOne();

    if (settings) {

      settings.email = email || settings.email;
      settings.whatsapp = whatsapp || settings.whatsapp;
      settings.address = address || settings.address;

      settings.instagram = instagram || settings.instagram;
      settings.facebook = facebook || settings.facebook;
      settings.linkedin = linkedin || settings.linkedin;

      const updatedSettings = await settings.save();

      res.json(updatedSettings);

    } else {

      settings = await Settings.create({
        email,
        whatsapp,
        address,
        instagram,
        facebook,
        linkedin
      });

      res.status(201).json(settings);
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    getSettings,
    updateSettings,
};
