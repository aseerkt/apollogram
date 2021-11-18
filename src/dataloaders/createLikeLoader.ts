import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Like } from '../entities/Like';

export const createLikeLoader = () =>
  new DataLoader<string, Like[]>(async function (postIds) {
    const likes = await Like.find({
      where: { postId: In(postIds as string[]) },
    });

    const likesForPost: Record<string, Like[]> = {};

    likes.forEach((l) => {
      likesForPost[l.postId] = (likesForPost[l.postId] || []).concat(l);
    });

    return postIds.map((id) => likesForPost[id]);
  });
