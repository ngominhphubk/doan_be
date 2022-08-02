import userModel from '~/models/user.model';
import util from '~/util';
const userController = {};

userController.signUp = async (req, res) => {
    console.log('body :', req.body);
    const { tentk, matkhau, email, sdt } = req.body;
    const mk = await util.createPasswd(matkhau);
    console.log(mk);
    const result = await userModel.insert(tentk, mk, email, sdt);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};

export default userController;
