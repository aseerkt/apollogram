import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Comment } from '../entities/Comment';

export const createCommentLoader = () =>
  new DataLoader<string, Comment[]>(async function (postIds) {
    const comments = await Comment.find({
      where: { postId: In(postIds as string[]) },
      order: { createdAt: 'DESC' },
    });

    const commentsForPost: Record<string, Comment[]> = {};

    comments.forEach((c) => {
      commentsForPost[c.postId] = (commentsForPost[c.postId] || []).concat(c);
    });

    return postIds.map((id) => commentsForPost[id] || []);
  });
