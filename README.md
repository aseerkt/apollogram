# Apollo Instagram Clone

> Instagram Clone | Social Media Application

| Web UI                                        | Mobile UI                                                |
| --------------------------------------------- | -------------------------------------------------------- |
| ![web-screenshot](assets/instagram_clone.png) | ![mobile-screenshot](assets/instagram_clone_moto_g4.png) |

## Stacks Used

| Frontend      | Backend             |
| ------------- | ------------------- |
| React         | GraphQL + Express   |
| TailwindCSS   | TypeORM, PostgreSQL |
| Apollo Client | Apollo Server       |

## Get Started

### Prerequisites

- `node v^14.5`
- `yarn v^1.22.5` - required for file upload feature to work on backend
- `git` - version control
- PostgreSQL - Database
- Cloudinary Account

### Installing

- Clone the repo - `git clone https://github.com/aseerkt/apollo-instagram-clone.git`

##### Setting up backend

- Go to server folder - `cd server`
- Install dependencies - `yarn`
- Make sure PostgreSQL and Redis/MongoDB databases are ready for connection.
- Create `.env` file with the command `cp .env.exmaple .env` and fill in necessary fields
- Provide your PostgreSQL connection config in `ormconfig.js`
- Start the development server - `yarn dev`
- Go to url [http://localhost:5000/graphql](http://localhost:5000/graphql) for GraphQL playground.
- Seed the db with mock data if needed. `yarn seed`

##### Setting up frontend

- Go to client folder - `cd client`
- Install dependencies - `yarn`
- `cp .env.example .env` and fill the fields in the file `.env`
- Start the react development server - `yarn start`
- Go to url [http://localhost:3000](http://localhost:3000)

## Roadmap

- [x] JWT cookie based authentication
- [x] Upload images to cloudinary
- [x] Add, like or unlike post
- [x] Comment on post
- [x] Edit Profile Photo with Image Crop
- [x] Edit Profile Credentials
- [x] Post pagination
- [x] Edit / Delete post
- [x] Follow / Unfollow Feature
- [x] Follow Suggestions
- [x] Post Feed based on followings
- [ ] Hashtag support
- [ ] Smiley support for caption and comments
- [ ] Mention poeples in caption and comments
- [ ] Notifications

## Authors

- [Aseer KT](https://github.com/aseerkt)

## License

- This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details

## Acknowledgments

- [Ben Awad](https://github.com/benawad)
- [Ahmed Hadjou](https://github.com/hidjou)
