import userModel from '~/models/user.model';
const userController = {};

userController.test = async (req, res) => {
    const result = await userModel.test();
    return result instanceof Error ? res.status(501).json('get wrong') : res.status(200).json(result);
};

export default userController;
