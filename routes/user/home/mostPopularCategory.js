import { getAggregate } from "../../../helpers/index.js";

const mostPopularCategory = async (req, res) => {
  try {
    const categories = await getAggregate("userBookServ", [
      {
        "$group": {
          "_id": "$categoryId",
          "count": { "$sum": 1 }
        }
      },
      // {
      //   "$sort": { "count": -1 }
      // },
      // {
      //   "$limit": 5
      // },
      // {
      //   "$lookup": {
      //     "from": "categories",
      //     "localField": "_id",
      //     "foreignField": "_id",
      //     "as": "categoryDetails"
      //   }
      // },
      // {
      //   "$unwind": "$categoryDetails"
      // }
    
    ]);

console.log(mostPopularCategory,"mostPopularCategory");

    if (!mostPopularCategory || mostPopularCategory.length === 0) {
     
      return res.status(400).send({
        status: 400,
        message: "Category Not found"
      });
    }
    
    return res.status(200).json({ status: 200, data:{mostPopularCategory} });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export default mostPopularCategory;


