# mern-ejam-task

Little playground project on MERN stack

## Development

### Requirements

1. Make sure you have [Node.js](http://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed.
2. Make sure you have [Docker](https://docs.docker.com/engine/install/) with [Docker Compose](https://docs.docker.com/compose/install/) installed

### Running app

1. Install dependencies

```sh
yarn
```

2. Build code

```sh
yarn run build

```

3. Run database service
```
yarn run start-mongo-local
```

4. Run server

```sh
yarn run start
```

5. Open browser at [http://localhost:5000/](http://localhost:5000/)

### Running E2E tests

```sh
yarn run build
yarn run test-e2e
```

### Checking code style

```sh
yarn run check
```
