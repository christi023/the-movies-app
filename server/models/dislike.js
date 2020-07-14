const mongoose = require('mongoose');

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    videoId: {
      type: String,
    },
  },
  { timestamps: true },
);

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike };
