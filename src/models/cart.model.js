import pool from '~/configs/db.configs';
// id
// mand
// masp
// soluong
const queries = {
    getAll: 'select * from giohang where mand = ?',
    addNew: 'insert into giohang (mand, masp, soluong) values (?,?,?)',
    delete: 'delete from giohang where mand = ? and masp = ?',
    update: 'update giohang set soluong = ? where mand = ? and masp = ?',
};
const cartModel = {};
cartModel.getAll = async (mand) => {
    try {
        const [result] = await pool.execute(queries.getAll, [mand]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
cartModel.addNew = async (mand, masp, soluong) => {
    try {
        const [result] = await pool.execute(queries.addNew, [mand, masp, soluong]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
cartModel.delete = async (mand, masp) => {
    try {
        const [result] = await pool.execute(queries.delete, [mand, masp]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
cartModel.update = async (mand, masp, soluong) => {
    try {
        if (soluong < 1) {
            return await cartModel.delete(mand, masp);
        }
        const [result] = await pool.execute(queries.update, [soluong, mand, masp]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};

export default cartModel;
