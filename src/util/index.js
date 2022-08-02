import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const util = {};

util.renameImg = (file, productId, index = 'avatar', prefix = 'SP') => {
    //use for user pass user id instead of
    const extension = file.filename.split('.').pop();
    const newName = `${prefix}${productId}_${Date.now()}_${index}.${extension}`;
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
util.createPasswd = async (data) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data, salt);
    return hashPassword;
};
util.checkPasswd = async (pass, hash) => {
    const result = await bcrypt.compare(pass, hash);
    return result;
};

export default util;
