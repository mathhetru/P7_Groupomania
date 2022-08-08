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
        if (!fs.existsSync('avatars')) { 
            fs.mkdirSync('avatars'); 
            callback(null, 'avatars');
        } else { 
        callback(null, 'avatars');
        }
    },
    filename: (req, file, callback) => { 
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype]; 
        callback(null, name + Date.now() + '.' + extension);  
    }
});

module.exports = multer({ storage }).single('avatar'); 
