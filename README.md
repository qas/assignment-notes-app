# Notes App ⚡️
> A RESTFul API server for a simple notes application.

## Installation

```sh
npm install
```

## Usage example

```sh
npm run start ## start normally
npm run start:analyze ## profiling with visual of flamegraph
```


Use the [Postman collection](https://github.com/qas/notes-app/blob/master/.postman/postman_collection.json) to quickly start interacting with the RESTful API endpoints.

[Visit the API documentation](https://documenter.getpostman.com/view/462330/RztppnGJ)

Tip: Creating a single note using `POST /v1/notes` returns some links which you can use to interact with the newly created note.

## Development setup

Run the application as a developer

```sh
npm run dev
```

Testing

```sh
npm run test    
```

## Release History

* 0.1.0
    * The first proper release
    * CHANGE: Minimalist notes app
* 0.0.1
    * Work in progress
