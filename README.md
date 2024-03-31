

### Application Installation and Usage Instructions
To run the project run the below two commands respectively after creating a library_db database:
1. npm install
2. npm start

### Environment Variables
DB_DBNAME="library_db"  <!-- Name of the database that we create manually. For this project it's 'library_db'-->
DB_USERNAME=""          <!-- username to use the database 'library_db'. Usually, it's the default 'root'-->
DB_PASSWORD=""          <!-- password to use the database -->
DB_HOST="localhost"     <!-- if you are running this project in your P.C. let the value to remain 'localhost'-->

### Additional Libraries/Packages
sequelize, mysql2, nodemon

### NodeJS Version Used
v18.17.1

### DATABASE

Create the ‘library_db’ database without any tables or data. SQL query for the same is:
`CREATE DATABASE librarydb;`
(backticks are not needed)

To populate the database with initial values do the following:

To populate database hit the following apis using Postman. post methods below
1.http://localhost:3000/authors/populate
2.http://localhost:3000/genres/populate
3.http://localhost:3000/languages/populate
4.http://localhost:3000/books/populate
5.http://localhost:3000/populate

### DATABASEACCESS
CREATE LOGIN 'dabcaowner' WITH PASSWORD = 'dabca1234';
CREATE USER 'dabcauser' FOR LOGIN 'dabcaowner';
ALTER ROLE db_owner ADD MEMBER 'dabcauser';

### NOTES
All routes can be tested in POSTMAN by providing proper routes, http methods and wherever needed req.body.