import pool from '~/configs/db.configs';

const queries = {
    logIn: 'select * from nguoidung where tentk = ? or sdt = ? or email = ?',
    insert: 'insert into nguoidung (tentk, matkhau, email, sdt) values (?,?,?,?)',
    getAllUser: 'select * from nguoidung where quyen = 1',
    getAllAdmin: 'select * from nguoidung where quyen = 0',
    getById: 'select * from nguoidung where manguoidung = ?',
    getByInfo: 'select * from nguoidung where tentk like ? or sdt like ? or email like ?',
    delete: 'delete from nguoidung where manguoidung = ?',
    updateInfo:
        'update nguoidung set hoten = ?, gioitinh = ?, ngaysinh = ?, sdt = ?, diachi = ?, email = ? where manguoidung = ?',
    updateQuyen: 'update nguoidung set quyen = ? where manguoidung = ?',
    updatePasswd: 'update nguoidung set matkhau = ? where manguoidung = ?',
};
const userModel = {};

userModel.logIn = async (ten) => {
    const [result] = await pool.execute(queries.logIn, [ten, ten, ten]);
    console.log('model', result);
    if (!result) return new Error('model wrong');
    return result;
};
userModel.insert = async ({ tentk, mk, email, sdt }) => {
    try {
        const [checkTenTk] = await pool.execute('select manguoidung from nguoidung where tentk = ?', [tentk]);
        console.log(checkTenTk);
        if (checkTenTk.length > 0) {
            return new Error(`ten tai khoan ${tentk} da duoc dang ky`);
        }

        if (email.length > 0) {
            const [checkEmail] = await pool.execute('select manguoidung from nguoidung where email = ?', [email]);
            if (checkEmail.length > 0) {
                return new Error(`email ${email} da duoc dang ky`);
            }
        }

        if (sdt.length > 0) {
            const [checkSdt] = await pool.execute('select manguoidung from nguoidung where sdt = ?', [sdt]);
            if (checkSdt.length > 0) {
                return new Error(`sdt : ${sdt} da duoc dang ky`);
            }
        }
        const [result] = await pool.execute(queries.insert, [tentk, mk, email, sdt]);
        console.log('modelresult', result);
        return result;
    } catch (error) {
        return new Error(error);
    }
}; // da check
userModel.getAllUser = async () => {
    try {
        const [result] = await pool.execute(queries.getAllUser);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
userModel.getAllAdmin = async () => {
    try {
        const [result] = await pool.execute(queries.getAllAdmin);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
userModel.getById = async (id) => {
    try {
        const [user] = await pool.execute(queries.getById, [id]);
        return user;
    } catch (error) {
        return new Error(error);
    }
};
userModel.getByInfo = async (ins) => {
    try {
        const info = `%${ins}%`;
        console.log(info);
        const [result] = await pool.execute(queries.getByInfo, [info, info, info]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
userModel.delete = async (id) => {
    try {
        const [result] = await pool.execute(queries.delete, [id]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
userModel.updateInfo = async ({ hoten, gioitinh, ngaysinh, sdt, diachi, email, id }) => {
    try {
        const [checkEmail] = await pool.execute(
            'select manguoidung from nguoidung where email = ? and manguoidung != ?',
            [email, id],
        );
        if (checkEmail.length > 0) {
            return new Error(`email : ${email} da dc nguoi khac su dung`);
        }
        const [checkSdt] = await pool.execute('select manguoidung from nguoidung where sdt = ? and manguoidung != ?', [
            sdt,
            id,
        ]);
        if (checkSdt.length > 0) {
            return new Error(` sdt : ${sdt} da dc nguoi khac su dung`);
        }
        const [result] = await pool.execute(queries.updateInfo, [hoten, gioitinh, ngaysinh, sdt, diachi, email, id]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
userModel.updateQuyen = async (quyen, id) => {
    try {
        const [result] = await pool.execute(queries.updateQuyen, [quyen, id]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
userModel.updatePasswd = async (mk, id) => {
    try {
        const [result] = await pool.execute(queries.updatePasswd, [mk, id]);
        return result;
    } catch (error) {
        return new Error(error);
    }
};
export default userModel;
