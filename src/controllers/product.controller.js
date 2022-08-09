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

productController.getById = async (req, res) => {
    const result = await productModel.getById(req.params.masp);
    if (result instanceof Error) return res.status(500).json('Error!!!');
    res.status(200).json(result);
};

productController.getByName = async (req, res) => {
    const [result] = await productModel.getByName(req.params.tensp);
    if (result instanceof Error) return res.status(500).json('Error!!!');
    res.status(200).json(result);
};
productController.getByType = async (req, res) => {
    const [result] = await productModel.getByType(req.params.loaisp);
    console.log('controller : ', result);
    if (result instanceof Error) return res.status(500).json('Error!!!');
    res.status(200).json(result);
};

productController.getAllProduct = async (req, res) => {
    const products = await productModel.getAll();
    console.log(products);
    if (products instanceof Error) return res.status(500).json('Error!!!');
    res.status(200).json(products);
};

productController.getAllProType = async (req, res) => {
    console.log('welcome to get all type');
    const lsp = await productModel.getAllProType();
    console.log('controller', lsp);
    if (lsp instanceof Error) return res.status(500).json('Error!!!');
    res.status(200).json(lsp);
};

productController.deleteProductWithId = async (req, res) => {
    const masp = req.params.masp;
    const [product] = await productModel.getById(masp);
    const avatar = product.anhdaidien;
    const images = product.anhsp.split('||');
    util.deleteImg(avatar);
    images.forEach((ele) => util.deleteImg(ele));
    const result = await productModel.deleteWithId(masp);
    if (result instanceof Error) return res.status(500).json('Error!!!');
    res.status(200).json(result);
};

productController.insertProduct = async (req, res) => {
    console.log('files', req.files);
    console.log('body :', req.body);
    console.log('header: ', req.headers);
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
    console.log('files', req.files);
    console.log('body :', req.body);
    console.log('header: ', req.headers);
    const imgUrl = [];
    if (imgUrl.length >= 1) {
        Object.values(req.files)
            .reduce((all, cur) => {
                return (all = [...all, ...cur]);
            }, [])
            .map((ele) => ele.filename);
        console.log(imgUrl);
    }
    if (!checkReqBodyData(req)) {
        imgUrl.forEach((element) => {
            util.deleteImg(element);
        });

        return res.json({
            message: 'Missing required parameter(s)',
        });
    }
    const masp = req.params.masp;
    const [oldProduct] = await productModel.getById(masp);
    if (!oldProduct) {
        console.log('controller ko tim thay san pham can update');
        imgUrl.forEach((element) => {
            util.deleteImg(element);
        });
        return new Error('ko tim thay san pham can update');
    }
    console.log('old product', oldProduct);
    const oldAvatar = oldProduct.anhdaidien;
    console.log('old avatar', oldAvatar);
    const oldImgs = oldProduct.anhsp.split('||');
    let avatarImg = '';
    if (req.files.thumb) {
        avatarImg = util.renameImg(req.files.thumb[0], masp);
    }
    let otherImgs = '';
    if (req.files.images) {
        otherImgs = req.files.images
            .map((ele, index) => {
                return util.renameImg(ele, masp, index);
            })
            .join('||');
    }
    const { tensp, loaisp, gia, nhacungcap, donvi, soluong, anhdaidien, anhsp } = req.body;
    const newAvatar = anhdaidien || avatarImg;
    let newImgs = anhsp;
    if (anhsp.length < 1) {
        newImgs = otherImgs;
    }
    if (otherImgs.length > 0) {
        newImgs = anhsp.concat('||', otherImgs);
    }
    if (anhdaidien !== oldAvatar) util.deleteImg(oldAvatar);
    oldImgs.forEach((ele) => {
        if (!anhsp.includes(ele)) util.deleteImg(ele);
    });
    await productModel.updateImageName(masp, newAvatar, newImgs);

    const result = await productModel.updateProduct(masp, tensp, loaisp, gia, nhacungcap, donvi, soluong);
    console.log('controller', result);
    if (result instanceof Error) return res.status(400).json(result.message);
    return res.status(200).json('OK');
};
export default productController;
