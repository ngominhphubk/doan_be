import pool from '~/configs/db.configs';
const queries = {
    getAll: 'select * from sanpham',
    getById: 'select * from sanpham where masp = ?',
    getByName: 'select * from sanpham where tensp like ?',
    getByType: 'select * from sanpham where loaisp like ?',
    getAllProType: 'select distinct loaisp from sanpham where 1',
    deleteById: 'delete from sanpham where masp = ?',
    insert: 'insert into sanpham (tensp,loaisp,gia,nhacungcap, donvi, soluong) values (?,?,?,?,?,?)',
    update: 'update sanpham set tensp = ?, loaisp = ?,gia = ?, nhacungcap = ?, donvi = ?, soluong = ? where masp = ?',
    addImageName: 'update sanpham set anhdaidien = ?, anhsp = ? where masp = ?',
};

const productModel = {};
productModel.getById = async (id) => {
    try {
        const [product] = await pool.execute(queries.getById, [id]);
        return product;
    } catch (error) {
        console.log(error);
        return new Error(error);
    }
};
productModel.getByName = async (name) => {
    try {
        name = `%${name}%`;
        const product = await pool.execute(queries.getByName, [name]);
        return product;
    } catch (error) {
        console.log(error);
        return new Error(error);
    }
};
productModel.getByType = async (type) => {
    try {
        type = `%${type}%`;
        const product = await pool.execute(queries.getByType, [type]);
        console.log(product);
        return product;
    } catch (error) {
        console.log(error);
        return new Error(error);
    }
};
productModel.getAll = async () => {
    try {
        const [products] = await pool.execute(queries.getAll);
        console.log(products);
        return products;
    } catch (error) {
        console.log(error);
        return new Error(error);
    }
};
productModel.deleteWithId = async (id) => {
    try {
        const [result] = await pool.execute(queries.deleteById, [id]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
productModel.insertProduct = async (tensp, loaisp, gia, nhacungcap, donvi, soluong) => {
    try {
        const [isProductNameExist] = await pool.execute(queries.getByName, [tensp]);
        if (isProductNameExist.length > 0) return new Error('Tên sản phẩm đã tồn tại');
        const [result] = await pool.execute(queries.insert, [tensp, loaisp, gia, nhacungcap, donvi, soluong]);
        return result;
    } catch (error) {
        return error;
    }
};
productModel.updateProduct = async (masp, tensp, loaisp, gia, nhacungcap, donvi, soluong) => {
    try {
        let [productNames] = await pool.execute('select tensp from sanpham where masp != ?', [masp]);
        productNames = productNames.map((item) => item.tensp);
        if (productNames.includes(tensp)) return new Error(`Tên sản phẩm '${tensp}' đã tồn tại`);
        const [result] = await pool.execute(queries.update, [tensp, loaisp, gia, nhacungcap, donvi, soluong, masp]);
        console.log('model', result);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
productModel.updateImageName = async (id, avatar, other) => {
    try {
        const result = await pool.execute(queries.addImageName, [avatar, other, id]);
        return result;
    } catch (err) {
        return new Error(err);
    }
};
productModel.getAllProType = async () => {
    try {
        const [lsp] = await pool.execute(queries.getAllProType);
        console.log('router', lsp);
        return lsp;
    } catch (err) {
        return new Error(err);
    }
};

export default productModel;
