const express = require('express');
const router = express.Router();
const { Comment } = require('../models/comment');
const { auth } = require('../middleware/auth');

//=================================
//             Subscribe
//=================================

//------------------SAVE COMMENTS----------------------
router.post('/saveComment', auth, async (req, res) => {
  try {
    const comment = new Comment(req.body);

    comment.save((err, comment) => {
      console.log(err);
      if (err) return res.json({ success: false, err });

      Comment.find({ _id: comment._id })
        .populate('writer')
        .exec((err, result) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).json({ success: true, result });
        });
    });
  } catch (err) {
    return err;
  }
});

//------------------GET COMMENTS----------------------
router.post('/getComments', async (req, res) => {
  try {
    Comment.find({ postId: req.body.movieId })
      .populate('writer')
      .exec((err, comments) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, comments });
      });
  } catch (err) {
    return err;
  }
});

module.exports = router;
