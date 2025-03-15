
import { insertNewDocument, findOne } from "../../../../helpers/index.js";





const getAddress = async (req, res) => {
  try {






    const getAddress = await findOne(
      "address",
    );
    if (!getAddress) {
      return res.status(404).send({ status: 404, message: "No data found" });
    }
    return res
      .status(200)
      .send({ status: 200, data:{getAddress} });


  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

export default getAddress;
