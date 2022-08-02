import cartModel from '~/models/cart.model';

const cartController = {};
cartController.getByUser = async (req, res) => {
    const mand = req.params.id;
    const result = await cartModel.getAll(mand);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
cartController.addNew = async (req, res) => {
    const mand = req.params.id;
    const masp = req.params.masp;
    const soluong = req.params.soluong;
    const result = await cartModel.addNew(mand, masp, soluong);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
cartController.delete = async (req, res) => {
    const mand = req.params.id;
    const masp = req.params.masp;
    const result = await cartModel.delete(mand, masp);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
cartController.update = async (req, res) => {
    const mand = req.params.id;
    const masp = req.params.masp;
    const soluong = req.params.soluong;
    console.log('controller', mand, masp, soluong);
    const result = await cartModel.update(mand, masp, soluong);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};

export default cartController;
