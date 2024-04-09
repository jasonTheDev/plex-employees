# Plex Employees

This project includes a React front-end that uses the **@tanstack/react-table** module, and an **Express** back-end connected to a **Postgres** database. The Postgres service is defined in the [docker-compose.yml](/docker-compose.yml) file in the root of the project, so no need to install or configure it manually.

## To Run

From the root of the project, first start the database by running:

```docker-compose up```

Then in a new terminal start both servers with:

```npm start```

Then in your favorite browser, navigate to http://localhost:3000 

## Completed

### Required

- [x] Retrieve employees from a REST API
- [x] Display the employees in a React application
- [x] Has UI mechanisms for creating and deleting employees
- [x] Has API endpoints for creating and deleting employees
- [x] Edit your version of the README.md

### Bonus

- [x] Use a relational database
- [x] UI mechanisms to edit/update employee data
- [x] Add API endpoint to update employee data
- [x] Use React Table (kinda)

## About

In general, my process for building the app looked something like this:

  1. Create and test an API endpoint
  2. Connect client to API
  3. Proper client functionality and structure
  4. Add styling
  5. Refactor as needed
  6. Continue to next API endpoint

I took an iterative approach to building the app. I started with the fetch employees API, which I testing with Insomnia before connecting it to the front-end. After starting to build the DELETE and CREATE endpoints, I realized that integrating a database would more easily be done now, rather than after implementing all the methods using an array for storage. So I decided to integrate a database early in the project.

After doing some research, I decided to use Postgres because it has easy integration with node via a module name pg, and lots of documentation. After more research I figured out how to configure and run the database with a [docker-compose.yml](/docker-compose.yml) file, making it easy for anyone else that might want to fire up the app.

After getting some basic functionality for adding and deleting employees, I refactored the server into [/controllers](/server/controllers) and [/routes](/server/routes) folders, and moved the methods for setting up the database into [db.js](/server/data/db.js) to better structure the project.

On the front-end I used Tanstack table for building the table, react-hook-form for collecting employee inputs, and css for styling. I added components to a components folder and extracted all API calls into a separate module called [employee.api.js](/src/api/employee.api.js).

### Next Steps

If I was going to put more time into the project, my next priorities would be:

1. Add validation to the API (maybe using Joi)
2. Add filtering, pagination and ordering to table (need to do more Tanstack research)
3. Add edit button to each row and make employees editable in-place

