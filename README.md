

### Application Installation and Usage Instructions
To run the project run the below two commands respectively:
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

### DATABASEACCESS
CREATE LOGIN 'dabcaowner' WITH PASSWORD = 'dabca1234';
CREATE USER 'dabcauser' FOR LOGIN 'dabcaowner';
ALTER ROLE db_owner ADD MEMBER 'dabcauser';
