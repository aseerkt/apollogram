// import {
//   BaseEntity,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryColumn,
// } from 'typeorm';
// import { User } from './User';

// // User following who

// @Entity('follows')
// export class Follow extends BaseEntity {
//   @PrimaryColumn()
//   username: string;

//   @PrimaryColumn()
//   followingUsername: string;

//   @ManyToOne(() => User, (user) => user.followings, {
//     eager: true,
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'usename', referencedColumnName: 'username' })
//   user: User;

//   @ManyToOne(() => User, (user) => user.followers, {
//     eager: true,
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'followingUsername', referencedColumnName: 'username' })
//   following: User;
// }
