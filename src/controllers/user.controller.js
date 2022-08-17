import userModel from '~/models/user.model';
import util from '~/util';
const userController = {};

userController.signUp = async (req, res) => {
    console.log('body :', req.body);
    const { tentk, matkhau, email, sdt } = req.body;
    const mk = await util.createPasswd(matkhau);
    const result = await userModel.insert({ tentk, mk, email, sdt });
    console.log('controller', result);
    return result.status === 'error' ? res.status(501).json(result) : res.status(200).json(result);
};
userController.logIn = async (req, res) => {
    //demo123 for all passwd
    const { tentk, matkhau } = req.body;
    console.log('controller', req.body);
    console.log('controller', tentk);
    const [user] = await userModel.logIn(tentk);
    console.log('user result', user);
    if (!user) {
        return res.status(500).json('wrong cant get user');
    }
    const checkPasswd = await util.checkPasswd(matkhau, user.matkhau);
    console.log('controller check pass', checkPasswd);
    const token = util.generateToken(user);
    const rfToken = util.generateRefreshToken(user);
    let role = 'user';
    if (user.quyen == 0) {
        role = 'admin';
    }
    if (user.quyen == 2) {
        role = 'superAdmin';
    }
    const { matkhau: mk, quyen, ...info } = user;

    return !checkPasswd
        ? res.status(501).json('wrong')
        : res.status(200).json({
              token,
              rfToken,
              info,
              role,
          });
};
userController.getAllUser = async (req, res) => {
    const result = await userModel.getAllUser();
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
userController.getById = async (req, res) => {
    const result = await userModel.getById(req.params.id);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
userController.getByInfo = async (req, res) => {
    const result = await userModel.getByInfo(req.params.info);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
userController.delete = async (req, res) => {
    const result = await userModel.delete(req.params.id);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
userController.updateInfo = async (req, res) => {
    const { hoten, gioitinh, ngaysinh, sdt, email, diachi } = req.body;
    const id = req.params.id;
    const result = await userModel.updateInfo({ hoten, gioitinh, ngaysinh, sdt, diachi, email, id });
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
userController.updateQuyen = async (req, res) => {
    console.log('controller', req.body);
    const { quyen } = req.body;
    const id = req.params.id;
    const result = await userModel.updateQuyen(quyen, id);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
userController.updatePasswd = async (req, res) => {
    const { oldPass, newPass } = req.body;
    const id = req.params.id;
    const [curUser] = await userModel.getById(id);
    const checkPasswd = await util.checkPasswd(oldPass, curUser.matkhau);
    if (checkPasswd) {
        const hash = await util.createPasswd(newPass);
        const result = await userModel.updatePasswd(hash, id);
        return res.status(200).json(result);
    } else {
        return res.status(501).json('wrong');
    }
};

export default userController;
