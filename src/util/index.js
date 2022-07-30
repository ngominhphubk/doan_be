import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const util = {};

util.renameImg = (file, productId, index = 'avatar') => {
    const extension = file.filename.split('.').pop();
    const newName = `SP${productId}_${Date.now()}_${index}.${extension}`;
    fs.renameSync(`./public/images/${file.filename}`, `./public/images/${newName}`);
    return newName;
};

util.deleteImg = (fileName) => {
    try {
        fs.unlinkSync(`./public/images/${fileName}`);
    } catch (err) {
        return new Error(err);
    }
};

util.generateToken = (data) => {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
    return token;
};

util.generateRefreshToken = (data) => {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN, { expiresIn: '4h' });
    return token;
};

export default util;
