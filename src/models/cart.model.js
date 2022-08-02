import pool from '~/configs/db.configs';

const queries = {
    getById: 'select * from sanpham where id = 7',
};
const userModel = {};

userModel.test = async () => {
    try {
        const [result] = await pool.execute(queries.getById);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
export default userModel;
