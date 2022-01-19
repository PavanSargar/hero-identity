import dbConnect from "../../../db/dbconnect";

import Hero from "../../../models/Hero";

dbConnect();

// GET all records
// POST a new record
const hero = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const heros = await Hero.find({});
        res.status(200).json({ success: true, heros });
      } catch (err) {
        res.status(400).json({ sucess: false });
      }
      break;

    case "POST":
      try {
        const hero = await Hero.create(req.body);
        res.status(200).json({ success: true, hero });
      } catch (err) {
        res.status(400).json({ sucess: false });
      }
      break;

    default:
        res.status(400).json({ sucess: false });
      break;
  }
};

export default hero;