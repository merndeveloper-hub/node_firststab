import { findOne } from "../../../helpers/index.js";

const getSingleProfile = async (req, res) => {


  try {
    const {id} = req.params
  const getProfile = await findOne('user',{_id:id})
    console.log(getProfile,"getProfile");
    if (!getProfile) {
      return res.status(404).send({ status: 404, message: "No User found" });
    }
    return res.status(200).json({ status: 200, data:{getProfile} });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: e.message });
  }
};

export default getSingleProfile;


