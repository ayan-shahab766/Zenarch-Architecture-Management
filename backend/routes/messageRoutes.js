const express = require('express');
const router = express.Router();
const {
    createMessage,
    getMessages,
    deleteMessage,
    markMessageRead,
} = require('../controllers/messageController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(createMessage).get(protect, admin, getMessages);
router.route('/:id').delete(protect, admin, deleteMessage);
router.put("/:id/read", markMessageRead);

module.exports = router;
