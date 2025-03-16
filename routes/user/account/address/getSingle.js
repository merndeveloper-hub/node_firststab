
import { insertNewDocument, findOne, find } from "../../../../helpers/index.js";





const getSingleUserAddress = async (req, res) => {
  try {


const {id} = req.params



    const getUserAddress = await find(
      "address",
      {userId:id}
    );
    if (!getUserAddress) {
      return res.status(404).send({ status: 404, message: "No data found" });
    }
    return res
      .status(200)
      .send({ status: 200, data:{getUserAddress} });


  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

export default getSingleUserAddress;
