import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (whitelist.includes(file.mimetype)) {
        cb(null, true);
        return;
    }
    cb(null, false);
};

const upload = multer({
    storage,
    fileFilter,
});

const handleUpload = (req, res, next) => {
    upload.fields([
        { name: 'thumb', maxCount: 1 },
        { name: 'images', maxCount: 5 },
    ])(req, res, (err) => {
        if (err instanceof multer.MulterError || !req.files) {
            return res.status(400).json({
                status: 'Error',
                Error: !req.files ? 'Invalid file type / no file found' : err,
            });
        }
        next();
    });
};

export default handleUpload;
