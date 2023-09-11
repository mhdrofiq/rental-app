# Vehicle Rental Web Application

This project was created using the mern stack instead of laravel and php since building with laravel would require more than the alloted time to relearn the framework and implement it correctly. The last time I used it to build a web app was in 2022 as seen in this [link to repo](https://github.com/mhdrofiq/healthapp) directory.

This project can be run in the local environment. The ports used are found in the .env file and in the axios.js file inside the api folder of this repository. Before launching the app on a browser, clone this repo, and run:"

### `npm install`

Which installs all the dependencies listed in package.json. Then navigate to the backend repository of this project at: [link to repo](https://github.com/mhdrofiq/rental-app-backend), and clone it. Once complete, run npm install again in the backend repository.

## Available Scripts

In the backend directory, you can run:

### `npm run dev`

It will print the mode it is running in (development), the connection to the database (mongodb), and the port it is running in (3500), inside the console. Then in the front end directory, you can run:

### `npm start`

This will automatically open a browser tab with the web app running on it.

## List of Users

| Email | Password | Role |
| --- | --- | --- |
| rofiq@gmail.com | rofiqpass | Administrator |
| aldika@gmail.com | aldikapass | Reviewer |
| kamal@gmail.com | kamalpass | Administrator |
| hylmi@gmail.com | hylmipass | Reviewer |
| faris@gmail.com | farispass | Administrator |
| bintang@gmail.com | bintangpass | Administrator |

## Database Configuration

Database: MongoDB
Database name: RentalDB
Tables: orders, users, vehicles

Screenshots of the mongoDB interface can be found in the additional_documents folder




