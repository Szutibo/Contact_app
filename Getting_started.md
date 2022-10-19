# Welcome to my own contact app!

This app is my first full stack react app, which has a react frontend with css, and a node.js, express backend with MySql database.

## Features

You can make changes in the database by the help of the app.
You can Create new contacts, Read data from the db, Update existing ones and Delete contacts.
Also you can upload pictures.

## How to start

1. Open terminal:
    - cd to contacts_app\api and hit npm install
    - cd to contacts_app and also hit npm install

2. Open XAMPP and start Apache and MySql

3. Create a database preferably with the name of contact_app and import data.sql from contacts_app\database\data.sql 
    If you named the database else make sure to correct it in contacts_app\api\db.js at the 6th row, also you should check the other connection data there

5. Basically the backend runs on port: 3001 and the frontend runs on port: 3000, if you would like to change it:
    - for backend: go to contacts_app\api\index.js and change the port
    - for frontend: go to contacts_app\src\components\fetch\Fetch.js and change the port

6. That's it! You are ready to start the app by running the upcoming commands:
    - for the backend in your terminal which is cd-d into contacts_app\api hit node index.js
    - for the frontend in your terminal which is cd-d into contacts_app hit npm start

7. Hope you like it!
