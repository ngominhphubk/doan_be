import pool from '~/configs/db.configs';

const queries = {
    insert: 'insert into donhang (makh, tenkhnhan, diachinhan, sdt, email, trangthai, ghichu, tgdathang) values (?,?,?,?,?,?,?,?)',
    updateState: 'update donhang set trangthai = ?, ghichu = ? where madh = ?',
    getAll: 'select * from donhang order by madh desc',
    getById: 'select * from donhang where madh = ?',
    getByMakh: 'select * from donhang where makh = ?',
    getByState: 'select * from donhang where trangthai = ?',
    danhan: 'update donhang set trangthai = 4 where madh = ?',
};
const orderModel = {};
orderModel.addNew = async ({ makh, tenkh, diachi, sdt, email, ghichu }) => {
    try {
        const trangthai = 1;
        const date = new Date();
        const tg = `${date.getFullYear()}-${
            date.getMonth() + 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        console.log('model', tg);
        const [result] = await pool.execute(queries.insert, [makh, tenkh, diachi, sdt, email, trangthai, ghichu, tg]);
        console.log(result);
        return result;
    } catch (error) {
        console.log('sai o day order Model ');
        return new Error(error);
    }
};
orderModel.getAll = async () => {
    try {
        const [result] = await pool.execute(queries.getAll);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
orderModel.getById = async (id) => {
    try {
        const [result] = await pool.execute(queries.getById, [id]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
orderModel.getByMakh = async (makh) => {
    try {
        const [result] = await pool.execute(queries.getByMakh, [makh]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
orderModel.updateState = async ({ trangthai, ghichu, madh }) => {
    try {
        const [result] = await pool.execute(queries.updateState, [trangthai, ghichu, madh]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
orderModel.huydon = async ({ ghichu = '', madh }) => {
    try {
        const trangthai = 0;
        const [result] = await pool.execute(queries.updateState, [trangthai, ghichu, madh]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
orderModel.danhan = async (madh) => {
    try {
        const [result] = await pool.execute(queries.danhan, [madh]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
orderModel.getByState = async (state = 4) => {
    try {
        const [result] = await pool.execute(queries.getByState, [state]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};

export default orderModel;
