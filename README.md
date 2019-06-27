🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by.  Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric.  Contributing to docs does NOT count as a PR to meet your weekly requirements.

# API Documentation

#### 1️⃣ Backend deployed at [heroku](https://market-organizer.herokuapp.com/) <br>

## 1️⃣ Getting started

To get the server running locally:


- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### Backend framework goes here

🚫 Why did you choose this framework?
  
Node/Express js
- Uses Javascript to build web server.
- light-weight web application framework to help organize web application into an MVC architecture
- Express makes building REST API simpler


## 2️⃣ Endpoints

🚫This is a placeholder, replace the endpoints, access controll, and descriptioin to match your project

#### Organization Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/organizations/:orgId` | all users      | Returns the information for an organization. |
| PUT    | `/organizatoins/:orgId` | owners         | Modify an existing organization.             |
| DELETE | `/organizations/:orgId` | owners         | Delete an organization.                      |

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/users/current`        | all users           | Returns info for the logged in user.               |
| GET    | `/users/org/:userId`    | owners, supervisors | Returns all users for an organization.             |
| GET    | `/users/:userId`        | owners, supervisors | Returns info for a single user.                    |
| POST   | `/users/register/owner` | none                | Creates a new user as owner of a new organization. |
| PUT    | `/users/:userId`        | owners, supervisors |                                                    |
| DELETE | `/users/:userId`        | owners, supervisors |                                                    |

#### Orders Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/orders/`             | all users           | Returns all orders.               |
| GET    | `/orders/order_id`    |  all users           | Returns order by order ID.            |
| GET    | `/orders/vendor/:vendor_id` | all users | Returns orders by vendor ID                    |
| POST   | `/orders/vendor/:vendor_id` | all users       |  Add order by vendor ID |
| PUT    | `/orders/:order_id`        | all users |   Update an order by order ID   |
| DELETE | `/orders/:order_id`        | all users |   Delete an order by order ID.  |
| DELETE | `/orders/vendor/:vendorId` | all users |    Delete all orders by vendor ID.  |



#### Stalls Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/stalls/`        | all users           | Returns all stalls.               |
| GET    | `/stalls/market/:market_id`    | all users | Returns a stall by market ID.              |
| GET    | `/stalls/:id`        | all users | Returns stalls by stall ID                    |
| POST   | `/stalls/market/:market_id` | all users                | Add stall by market ID |
| PUT    | `/stalls/:stall_id`        | all users | Update an stall by stall ID |
| DELETE | `/stalls/:stall_id`        | all users | Delete an stall by stall ID. |

#### Carts Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/carts/`        | all users           | Returns all carts.               |
| GET    | `/carts/:id`    | all users | Returns a cart by regular id.             |
| POST    | `/carts/add-stall-to-cart/:id`        | all users | Add stall by cart ID.                    |
| POST   | `/carts/checkout` | all users                | handle transactions.  |
| DELETE    | `/carts/delete-stall-from-cart/:id`        | all users | Remove a stall from cart by cart ID.                                                  |
| DELETE | `/carts/clear-cart/:cart_id`        | all users |   Delete all stalls from a cart by cart ID.  |


# Data Model

🚫This is just an example. Replace this with your data model

#### USERS

---

```
{
  id: UUID
  email: STRING
  firebase_id: STRING
  user_type: STRING
}
```

#### MARKET
---

```
{
  id: UUID
  firebase_id: foreign key reference firebase_id in USERS table
  market_name: STRING
  contact_last_first: STRING
  contact_last_name: STRING
  address: STRING
  city: STRING
  state: STRING
  zipcode: INT
  phone_number: INT
  stripeAccountId: STRING
  image: STRING
}
```
#### VENDOR
---

```
{
  id: UUID
  firebase_id: foreign key reference firebase_id in USERS table
  company_name: STRING
  contact_fullname: STRING
  address: STRING
  city: STRING
  state: STRING
  zipcode: INT
  phone_number: INT
  company_url: STRING
  market_id: foreign key reference firebase_id in MARKET table
  stripeAccountId: STRING
  image: STRING
}
```
#### STALL
---

```
{
  id: UUID
  size: json
  market_id: foreign key reference firebase_id in MARKET table
  available: BOOLEAN
  price: INT
}
```
#### CART
---

```
{
  id: UUID
  firebase_id: foreign key reference firebase_id in VENDOR table
  total: FLOAT
}
```
#### CART_ITEM
---

```
{
  id: UUID
  cart_id: foriegn key reference firebase_id in CART table
  stalls_id: foriegn key reference id in STALL table
}
```

#### ORDERS
---

```
{
  id: UUID
  vendor_id: foreign key reference firebase_id in VENDOR table
  stall_id: foriegn key reference id in STALL table
  market_id  foreign key reference firebase_id in MARKET table
  size: JSON
  market_name: STRING
  price: FLOAT
}
```
#### PRODUCTS
---

```
{
  id: UUID
  title: STRING
  desciption: STRING
  price: FLOAT
  image: STRING
  vendor_id: foreign key reference firebase_id in VENDOR table
}
```


## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend


*Stalls:*

`getStalls()` -> Returns all stalls.

`getStallsById(id)` -> Returns a stall by stall ID. 

`getStallsByMarketId(market_id)` -> Returns stalls by market ID

`addStallByMarketId(market_id)` -> Add stall by market ID

`updateStallsByStallId(stall_id)` -> Update an stall by stall ID

`removeStallsByStallId(stall_id)` -> Delete an stall by stall ID.

*Carts:*

`getCarts()` -> Returns all carts.

`getCartById(id)` -> Returns a cart by regular id.  

`addStallToCart(cart_id)` -> Add stall by cart ID.

`checkout()` -> handle transactions. 

`removeStallFromCart(cart_id)` -> Remove a stall from cart by cart ID.

`clearCartByCartId(cart_id)` -> Delete all stalls from a cart by cart ID.

*Orders:*

`getOrders()` -> Returns all orders

`getOrderById(order_id)` -> Returns order by order ID. 

`getOrdersByVendorId(vendor_id)` -> Returns orders by vendor ID

`addOrderByVendorId(vendor_id)` -> Add order by vendor ID

`updateOrderByOrderId(order_id)` -> Update an order by order ID

`removeOrderByOrderId(order_id)` -> Delete an order by order ID.

`removeOrdersByVendorId(vendor_id)` -> Delete all orders by vendor ID. 


## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app
    
    *  DATABASE_URL - Your Postgres / mySQL database / Heroku Database URL
    *  DATABASE_HOST - The name of the Database Host hosting your database. 
    *  DATABASE - The name of your database.
    *  DATABASE_USER - The name of your username for your database. 
    *  DATABASE_PASSWORD - The password to access your database
    *  NODE_ENV - The development environment (i.e. development, production) for your app
    *  PORT - The localhost PORT number for local testing
    *  apiKey - The Firebase API Key that handles OAuth Authentication for Registration/LogIn
    *  authDomain - the Firebase Domain URL to access the Firebase URL
    *  projectId - the Firebase Project ID specific for your project
    *  storageBucket - the Firebase storage bucket URL to handle all image uploads.
    *  messagingSenderId - the Messaging Sender ID for our Firebase OAuth App
    *  appId - the App id specific to the firebase oAuth app
    *  STRIPE_SK - the Secret Key that gives access to the Stripe app for this app.
    *  STRIPE_CLIENT_ID - the client ID for our Stripe App
    *  STRIPE_AUTH_URI - the Stripe Authorization URL to authorize all Stripe transactions
    *  STRIPE_TOKEN_URI - the Stripe Token URL for users to retrieve a Stripe Token during the payment transaction of Stalls
    *  STRIPE_PK - the Stripe Public Key for our App.
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/labs-13-market-org/Front-End/blob/master/README.md) for details on the fronend of our project.

