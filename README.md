# React Frontend App for Holding and Investments

## How to start

This project has a backend build in python. Tha is a Django Api.

First clone or fork the backend repository and run it on port 8000. You can check the Backend on the following link:

https://github.com/diogowernik/django-python-backend-holding-and-investments

Clone or Fork this repository:

    git clone https://github.com/diogowernik/react-frontend-holding-and-investments.git frontend

Install the dependencies:

    npm install

Start the development server:

    npm start

And go to the running application:

    http://localhost:3000

Than create an account and login to the application.

## Features and Things to do

This app is not ready, there are some features that are missing. And some features that are working.

### Features that are Working for users on the frontend

- Register (Create an account)
- Login
- Logout
- Create for Multiple Portfolios
- Views for Portfolios, with charts, and list of investments, connected to the backend

### Features that need to be done for users on the frontend

- CRUD for Transaction (Create, Read, Update, Delete) at the moment only read
- Investments Radar
- Automatic create a tab for each category of investments with a list of investments
- Create a tab for brokers with a list of assets by broker.
- Think about the design of dividends
- Connect Token Chart to the backend
