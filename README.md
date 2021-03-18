# Apollo Instagram Clone

> Instagram Clone | Social Media Application

## Get Started

### Prerequisites

- `node v^14.5`
- `yarn v^1.22.5` - required for file upload feature to work on backend
- `git` - version control
- PostgreSQL - for storing data
- Redis / MongoDB - for session authentication

### Installing

- Clone the repo - `git clone https://github.com/aseerkt/apollo-instagram-clone.git`

##### Setting up backend

- Go to server folder - `cd server`
- Install dependencies - `yarn`
- Make sure PostgreSQL and Redis/MongoDB databases are ready for connection.
- Provide your database connection credentials in `ormconfig.js`
- Start the development server - `yarn dev`
- Go to url [http://localhost:5000/graphql](http://localhost:5000/graphql) for GraphQL playground.

##### Setting up frontend

- Go to client folder - `cd client`
- Install dependencies - `yarn`
- Start the react development server - `yarn start`
- Go to url [http://localhost:3000](http://localhost:3000)

## Authors

- [Aseer KT](https://github.com/aseerkt)

## License

- This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details

## Acknowledgments

- [Ben Awad](https://github.com/benawad)
- [Ahmed Hadjou](https://github.com/hidjou)
