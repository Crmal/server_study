import { Router } from 'express';
import { verifyToken } from '../middlewares/verify';
import Post from '../models/post';

const posts = Router();

posts.get('/', verifyToken, async (req, res) => {
  res.status(200).json({ data: await Post.findAll({})});
});

posts.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  if(await Post.findOne({ where: { id }})){
    return res.status(200).json({
      data: await Post.findOne({
          attributes: ['id', 'content', 'writer'],
          where: { id }
        }),
    });
  }
  res.status(404).json({
    data: "Post not exist",
  })
});

posts.post('/', verifyToken, async (req, res) => {
  const userId = req.authorization;
  console.log(userId);
  const post = await Post.create({
    content: req.body.content,
    writer: userId.id,
  });
  res.status(200).json({
    data: {
      id: post.id,
    },
  });
});

posts.put('/:postId', verifyToken, async (req, res) => {
  const { postId } = req.params;
  const userId = req.authorization;
  const userData = await Post.findOne({
    where: { id: postId }
  });

  if(userData.id == userId){
    await Post.update({
      content: req.body.content,
    }, {
      where: { id: postId }
    });
    return res.json({
      data: {
        id: userData.id
      }
    });
  }
  res.status(404).json({
    error: "Cannot modify post",
  });
})

posts.delete('/:postId', verifyToken, async (req, res) => {
  const userId = req.authorization;
  const userData = await Post.findOne({
    where: { writer: userId.id },
  });
  if(userId == userData.writer){
    await Post.destroy({
      where: { id: req.params.postId }
    })
    return res.status(200).json({
      data: "Successfully deleted",
    });
  }
  res.status(404).json({
    error: "Cannot delete post",
  });
});

module.exports = posts