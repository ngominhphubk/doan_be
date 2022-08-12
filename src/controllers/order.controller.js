import orderModel from '~/models/order.model';
import dsspModel from '~/models/dssp.model';
const orderController = {};

orderController.addNew = async (req, res) => {
    console.log('controller', req.body);
    const { makh, tenkh, diachi, sdt, email, ghichu, products } = req.body;
    const listPro = products;
    const result = await orderModel.addNew({ makh, tenkh, diachi, sdt, email, ghichu });
    const madh = result.insertId;
    listPro.forEach(async (ele) => {
        let { masp, soluong, tensp, tenncc, gia } = ele;
        await dsspModel.addNew({ madh, masp, soluong, tensp, tenncc, gia });
    });
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
orderController.getAll = async (req, res) => {
    const result = await orderModel.getAll();
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
orderController.getById = async (req, res) => {
    const id = req.params.id;
    const result = await orderModel.getById(id);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
orderController.getByMaKh = async (req, res) => {
    const id = req.params.id;
    const result = await orderModel.getByMakh(id);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
orderController.getByState = async (req, res) => {
    const state = req.params.state;
    const result = await orderModel.getByState(state);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
orderController.updateState = async (req, res) => {
    console.log('controller id', req.params.id);
    console.log('controller data', req.body);
    const madh = req.params.id;
    const { trangthai, ghichu } = req.body;
    const result = await orderModel.updateState({ trangthai, ghichu, madh });
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
orderController.huydon = async (req, res) => {
    const madh = req.params.id;
    const { ghichu } = req.body;
    const result = await orderModel.huydon({ ghichu, madh });
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
orderController.danhan = async (req, res) => {
    const madh = req.params.id;
    const result = await orderModel.danhan(madh);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
export default orderController;
