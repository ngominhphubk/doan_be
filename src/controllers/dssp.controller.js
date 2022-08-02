import dsspModel from '~/models/dssp.model';

const dsspController = {};
dsspController.getByMadh = async (req, res) => {
    const id = req.params.id;
    const result = await dsspModel.getByMadh(id);
    return result instanceof Error ? res.status(501).json('wrong') : res.status(200).json(result);
};
export default dsspController;
