import { find } from "../../../helpers/index.js";


const getContentPage = async (req, res) => {
  try {
    // const _id = req.params.id;

    // const launchpad = await findOne("launchPad", { _id });

     const faqCategory = await find("faqCategory");

    console.log(faqCategory, "contentPage...");

    if (!faqCategory) {
      return res.status(404).send({ status: 404, message: "No FAQ Category Found" });
    }

    return res.status(200).send({ status: 200, faqCategory });

  } catch (e) {

    return res.status(400).send({ status: 400, message: e.message });
  }
};

export default getContentPage;
