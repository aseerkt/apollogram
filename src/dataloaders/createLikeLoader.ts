import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Like } from '../entities/Like';

export const createLikeLoader = () =>
  new DataLoader<{ postId: string; username: string }, boolean>(async function (
    keys
  ) {
    const likes = await Like.find({
      where: {
        postId: In(keys.map((key) => key.postId)),
        username: In(keys.map((key) => key.username)),
      },
      select: ['postId', 'username'],
    });

    const likeForPost: Record<string, boolean> = {};

    likes.forEach((like) => {
      likeForPost[`${like.postId}|${like.username}`] = true;
    });

    return keys.map((key) => likeForPost[`${key.postId}|${key.username}`]);
  });
