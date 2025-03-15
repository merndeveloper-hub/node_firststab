import Joi from "joi";
import { insertNewDocument, findOne, updateDocument, deleteDocument } from "../../../../helpers/index.js";







const deleteAddress = async (req, res) => {
  try {
 
 
    
   





    const deletedAddress = await deleteDocument(
      "address",
     
{
  _id:req.params.id
}

    
    );

    if (!deletedAddress) {
      return res.status(404).send({ status: 404, message: "No Address found" });
    }

    return res
      .status(201)
      .send({ status: 201, message: "Address deleted successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

export default deleteAddress;
