import Joi from "joi";
import { find } from "../../../helpers/index.js";

const schemaForId = Joi.object().keys({
  id: Joi.string().required(),
});

const schema = Joi.object().keys({
  status: Joi.string().required(),
});

const booking = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    await schemaForId.validateAsync(req.params);
    const { id } = req.params;
    const { status } = req.body;

    let bookService;
    // pending ==> ongling,pending,accepted
    if (status == "OnGoing") {
      bookService = await find("userBookServ", {
        userId: id,
        status: { $in: ["Accepted", "Pending", "Requested", "OnGoing"] },
      });

      if (!bookService || bookService.length == 0) {
        return res
          .status(400)
          .json({ status: 400, message: "No Booking Found!" });
      }
      
    }

    return res.status(200).json({ status: 200, bookService });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export default booking;
