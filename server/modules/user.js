import UserDB from "../api/user";

const { Router } = require("express");

const router = Router();

router.post("/user", async (req, res) => {
  const { userId } = req.body;

  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  if (!userId)
    res.status(403).json({
      code: 403,
      message:
        "Please make sure you are passing the UID as a data parameter to the function",
      status: "PERMISSION_DENIED",
    });

  try {
    const userDb = new UserDB();

    const userData = await userDb.read(userId);

    res.status(200).json({ userData: userData });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
