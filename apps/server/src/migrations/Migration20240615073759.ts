import { Migration } from '@mikro-orm/migrations';

export class Migration20240615073759 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "img_url" varchar(255) not null default \'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y\', "name" varchar(255) not null default \'\');');
    this.addSql('create index "users_username_index" on "users" ("username");');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "profiles" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "website" varchar(255) not null default \'\', "bio" text not null default \'\', "gender" varchar(255) not null default \'\', "user_id" int not null);');
    this.addSql('alter table "profiles" add constraint "profiles_user_id_unique" unique ("user_id");');

    this.addSql('create table "posts" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "caption" varchar(255) not null, "img_url" varchar(255) not null, "author_id" int not null);');

    this.addSql('create table "likes" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "post_id" int not null);');

    this.addSql('create table "follows" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "follower_id" int not null, "following_id" int not null);');

    this.addSql('create table "comments" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "text" text not null, "author_id" int not null, "post_id" int not null);');

    this.addSql('alter table "profiles" add constraint "profiles_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "posts" add constraint "posts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "likes" add constraint "likes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "likes" add constraint "likes_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade;');

    this.addSql('alter table "follows" add constraint "follows_follower_id_foreign" foreign key ("follower_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "follows" add constraint "follows_following_id_foreign" foreign key ("following_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "comments" add constraint "comments_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "comments" add constraint "comments_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade;');
  }

}
