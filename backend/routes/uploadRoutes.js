const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        // ensure files are written to the same uploads folder used by the static
        // middleware. __dirname points at backend/routes, so ../uploads is
        // backend/uploads.
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// @desc    Upload single image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), (req, res) => {
    res.json({
        path: `/uploads/${req.file.filename}`
    });
});

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private/Admin
router.post('/multiple', protect, admin, upload.array('images', 10), (req, res) => {
    const paths = req.files.map(file => `/uploads/${file.filename}`);
    res.json(paths);
});

// @desc    Get all uploaded images
// @route   GET /api/upload
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        // align with storage/serve destination (backend/uploads)
        const directoryPath = path.join(__dirname, '../uploads');
        if (!fs.existsSync(directoryPath)) {
            return res.json([]);
        }

        const files = await fs.readdir(directoryPath);

        const images = files.map(file => {
            const stats = fs.statSync(path.join(directoryPath, file));
            return {
                id: file,
                name: file,
                url: `/uploads/${file}`,
                createdAt: stats.birthtime,
                size: stats.size
            };
        }).sort((a, b) => b.createdAt - a.createdAt);

        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error reading uploads folder' });
    }
});

// @desc    Delete an image file
// @route   DELETE /api/upload/:filename
// @access  Private/Admin
router.delete('/:filename', protect, admin, async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../uploads', filename);

        if (fs.existsSync(filePath)) {
            await fs.remove(filePath);
            res.json({ message: 'Image deleted successfully' });
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting image' });
    }
});

module.exports = router;
