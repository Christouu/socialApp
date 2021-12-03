const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new con
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedCon = await newConversation.save();
    res.status(200).json(savedCon);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get con of user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get conversation includes two user id

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
