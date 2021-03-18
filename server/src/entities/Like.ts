import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseColumns } from './BaseColumns';
import { Post } from './Post';
import { User } from './User';

@Entity('likes')
export class Like extends BaseColumns {
  @Column('uuid')
  username: string;

  @Column('uuid')
  postId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
  post: Post;
}
