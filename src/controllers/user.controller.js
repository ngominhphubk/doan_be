import userModel from '~/models/user.model';
import util from '~/util';
const userController = {};

userController.signUp = async (req, res) => {
    console.log('body :', req.body);
    const { tentk, matkhau, email, sdt } = req.body;
    const mk = await util.createPasswd(matkhau);
    const result = await userModel.insert({ tentk, mk, email, sdt });
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
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
    const role = user.Quyen == 0 ? 'admin' : 'user';
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
userController.getAllAdmin = async (req, res) => {
    const result = await userModel.getAllAdmin();
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
    const result = await userModel.getByInfo(req.params.id);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
userController.updateInfo = async (req, res) => {
    const { hoten, gioitinh, ngaysinh, sdt, diachi, email } = req.body;
    const id = req.params.id;
    const result = await userModel.updateInfo({ hoten, gioitinh, ngaysinh, sdt, diachi, email, id });
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
userController.updateQuyen = async (req, res) => {
    const { quyen } = req.body;
    const id = req.params.id;
    const result = await userModel.updateQuyen(quyen, id);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
userController.updatePasswd = async (req, res) => {
    const { passwd } = req.body;
    const id = req.params.id;
    const hash = await util.createPasswd(passwd);
    const result = await userModel.updatePasswd(hash, id);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};

export default userController;
