import { Router } from "express";
import User from '../models/user';
import Follow from "../models/follow";

const user = Router();

user.post('/follow/:userId', verifyToken, async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ where: { id: userId }});

  if(!user) {
    return res.status(404).json({
      error: {
        message: "계정이 없습니다",
      },
    });
  }

  const userFollow = await Follow.create({
    followingId: req.header("X-User-Id"),
    followerId: userId,
  });

  res.status(200).json({
    data: {
      message: userFollow.followerId,
    },
  });
});

user.post('unfollow/:userId', verifyToken, async (req, res) => {
  const { userId } = req.params;
  const followData = await Follow.findOne({
    where: {
      followerId: req.header("X-User-Id"),
      followerId: userId,
    },
  });
  // 팔로우 데이터가 없을경우
  if(!followData) {
    return res.status(404).json({
      error: {
        message: "팔로우를 하지 않았습니다.",
      },
    });
  }
  
  await followData.destroy();
  res.status(200).json({
    data: {
      message: "정상적으로 언팔로우 되었습니다."
    }
  });
});

export default user
