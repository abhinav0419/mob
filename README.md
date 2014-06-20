                                                           ADDRESS BOOK
BASIC OVERVIEW
The app is an address book which lets the user to create, delete and update contact. On clicking the contact the user can get details of the weather of the current place at which the user is using the forcast.io weather API.

SETTING UP THE DEVELOPMENT ENVIRONMENT
- Node.js
- MySQL database

INSTALLING NODE
- Since I used Ubuntu todevelop my web app to install node on ubuntu simply run the command 
- sudo apt-get install python-software-properties
- sudo add-apt-repository ppa:chris-lea/node.js
- sudo apt-get update
- sudo apt-get install nodejs

INSTALLING OTHER DEPENDENCIES
To install other dependencies you just need to go to the project directory through the terminal and type the following command
- npm install
this command will create a node_module directory.

SETTING UP MYSQL
-Create a database named 'mob'
-Create a table named 'mob' with column name as (id primary key, fname, lname, address).
In the app.js dont forget to put the password of your database in the password option.
RUNNING THE APP-
Just go to the terminal and type
- node app
This will run the app on local host on port number 4000.
ENJOY!!!!!! :)
