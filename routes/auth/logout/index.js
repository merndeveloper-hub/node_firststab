import Joi from "joi";
import {
  deleteDocument
} from "../../../helpers/index.js";
import mongoose from "mongoose";



const schema = Joi.object({
   id:Joi.string().required(),
});

const logout = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
   await schema.validateAsync(req.params)
    const { id } = req.params;

    const deleteToken = await deleteDocument("token", { user_id: id });
    console.log(deleteToken,"delete");
    
if(deleteToken.deletedCount <= 0){
  return res
  .status(400)
  .send({ status: 400, message: "No User Found!" });
}
    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .send({ status: 200, message:"Logout Successfully" });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).send({ status: 400, message: e.message });
  }
};

export default logout;
