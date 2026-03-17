const Project = require('../models/Project');
const User = require('../models/User');
const Message = require('../models/Message');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
try {
    const totalProjects = await Project.countDocuments();
    const totalUsers = await User.countDocuments();

    // unread = read:false
    const unreadMessages = await Message.countDocuments({ read: false });

    const recentMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalProjects,
      totalUsers,
      unreadMessages,
      recentMessages
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };