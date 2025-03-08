import { find } from "../../../helpers/index.js";


const getContentPage = async (req, res) => {
  try {
    // const _id = req.params.id;

    // const launchpad = await findOne("launchPad", { _id });

     const faqQuestions = await find("faqQuestion");

    console.log(faqQuestions, "contentPage...");

    if (!faqQuestions) {
      return res.status(404).send({ status: 404, message: "No FAQ Questions Found" });
    }

    return res.status(200).send({ status: 200, faqQuestions });

  } catch (e) {

    return res.status(400).send({ status: 400, message: e.message });
  }
};

export default getContentPage;
