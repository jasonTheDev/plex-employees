# Plex Employees

This project includes a React front-end that uses the @tanstack/react-table module, and an Express back-end connected to a Postgres database. The postgres service is defined in the `docker-compose.yaml` file in the root of the project, so no need to install it locally.

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
- [ ] UI mechanisms to edit/update employee data
- [ ] Add API endpoint to update employee data
- [x] Use React Table

