import { Entity, ManyToOne, type Rel } from '@mikro-orm/core'
import { BaseEntity } from './BaseEntity.js'
import { Post } from './Post.js'
import { User } from './User.js'

@Entity({ tableName: 'likes' })
export class Like extends BaseEntity<'post' | 'user'> {
  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Post)
  post: Rel<Post>
}
