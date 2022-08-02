import pool from '~/configs/db.configs';

const queries = {
    insert: 'insert into dssanpham (madh, masp, soluong, tensp, tenncc, gia) values (?,?,?,?,?,?)',
    getByMadh: 'select * from dssanpham where madh = ?',
};
const dsspModel = {};

dsspModel.addNew = async ({ madh, masp, soluong, tensp, tenncc, gia }) => {
    try {
        const [result] = await pool.execute(queries.insert, [madh, masp, soluong, tensp, tenncc, gia]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
dsspModel.getByMadh = async (madh) => {
    try {
        const [result] = await pool.execute(queries.getByMadh, [madh]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};

export default dsspModel;
