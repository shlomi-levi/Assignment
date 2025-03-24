# Project Setup Instructions

To run this project locally, follow these steps:

### 1. Clone the repository

Clone the repository to your desired location.

### 2. Create a `.env` file

In the root folder of the project, create a `.env` file and add the following environment variables:

```env
DATABASE_HOST=db
POSTGRES_PORT=5433
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_DB=popcorn_palace
MAX_SEATS_PER_THEATER=100
```

Make sure to update the values of `POSTGRES_PASSWORD`, `POSTGRES_USER`, and `POSTGRES_DB` if needed.

### 2. Build and run the project

Make sure that docker is installed on your system,
then open a command line in the project's root folder and run `docker-compose up`

### 3. Testing

Due to the time constraint and lack of familiarity with the framework, I haven't implemented tests, but I have included a postman collection with all the endpoints, in the file `API.postman_collection.json`

You can import it to postman and test the API's routes
