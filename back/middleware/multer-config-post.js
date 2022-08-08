const multer = require('multer');
const fs = require('fs'); 

const MIME_TYPES = { 
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({ 
    destination: (req, file, callback) => { 
        if (!fs.existsSync('images-posts')) { 
            fs.mkdirSync('images-posts'); 
            callback(null, 'images-posts');
        } else { 
        callback(null, 'images-posts');
        }
    },
    filename: (req, file, callback) => { 
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype]; 
        callback(null, name + Date.now() + '.' + extension);  
    }
});

module.exports = multer({ storage }).single('imageUrl'); 
