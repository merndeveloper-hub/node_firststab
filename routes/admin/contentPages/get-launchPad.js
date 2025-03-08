import { find } from "../../../helpers/index.js";


const getContentPage = async (req, res) => {
  try {
    // const _id = req.params.id;

    // const launchpad = await findOne("launchPad", { _id });

     const contentPage = await find("content");

    console.log(contentPage, "contentPage...");

    if (!contentPage) {
      return res.status(404).send({ status: 404, message: "No Content Page Found" });
    }

    return res.status(200).send({ status: 200, contentPage });

  } catch (e) {

    return res.status(400).send({ status: 400, message: e.message });
  }
};

export default getContentPage;
