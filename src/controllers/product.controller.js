import productModel from '~/models/product.model';
import util from '~/util';
const checkReqBodyData = (req) => {
    if (
        !req.body.tensp ||
        !req.body.loaisp ||
        !req.body.gia ||
        !req.body.nhacungcap ||
        !req.body.donvi ||
        !req.body.soluong
    )
        return false;
    return true;
};

const productController = {};

productController.getAllProduct = async (req, res) => {
    const products = await productModel.getAll();
    if (products instanceof Error) return res.status(500).json('Error!!!');
    res.status(200).json(products);
};
productController.getAllProductType = async (req, res) => {
    const types = await productModel.getAllProductType();
    if (types instanceof Error) return res.status(500).json('Error!!!');
    res.status(200).json(types);
};

productController.deleteProductWithId = async (req, res) => {
    const result = await productModel.deleteWithId(req.params.masp);
    if (result instanceof Error) return res.status(500).json('Error!!!');
    res.status(200).json('OK');
};

productController.insertProduct = async (req, res) => {
    const imgUrl = Object.values(req.files)
        .reduce((all, cur) => {
            return (all = [...all, ...cur]);
        }, [])
        .map((ele) => ele.filename);
    console.log(imgUrl);
    if (!checkReqBodyData(req)) {
        imgUrl.forEach((element) => {
            util.deleteImg(element);
        });
        return res.json({
            message: 'Missing required parameter(s)',
            body: req.body,
        });
    }
    const { tensp, loaisp, gia, nhacungcap, donvi, soluong } = req.body;
    const result = await productModel.insertProduct(tensp, loaisp, gia, nhacungcap, donvi, soluong);
    if (result instanceof Error) {
        imgUrl.forEach((element) => {
            util.deleteImg(element);
        });
        return res.status(400).json({
            status: 'Error',
            result: result.message,
        });
    }
    const avatarImg = util.renameImg(req.files.thumb[0], result.insertId);
    const otherImgs = req.files.images
        .map((ele, index) => {
            return util.renameImg(ele, result.insertId, index);
        })
        .join('||');
    await productModel.updateImageName(result.insertId, avatarImg, otherImgs);
    return res.json({
        status: `OK`,
        insertId: result.insertId,
    });
};

productController.updateProduct = async (req, res) => {
    if (!checkReqBodyData(req)) {
        return res.json({
            message: 'Missing required parameter(s)',
        });
    }
    const { tensp, loaisp, gia, nhacungcap, donvi, soluong } = req.body;
    const result = await productModel.updateProduct(req.params.masp, tensp, loaisp, gia, nhacungcap, donvi, soluong);
    if (result instanceof Error) return res.status(400).json(result.message);
    return res.json('OK');
};
export default productController;
