## Micro Instagram


## Tech stack used
  * node.js
  * sqlite
  * express.js
  * github





## Must have functionality

## user table using below data
  1. Create a user model with following field.
  a. Id - Number, autoincrement
  b. Name - Varchar(256)
  c. Mobile number- number(unique)
  d. Address - Text
  e. Post count - number (Whenever user creates a new post the count increases by 1)


## Create Post table with following details
  a. Id - Number, autoincrement
  b. Title - Text field
  c. Description - Text field
  d. User ID - Foreign key to user table in point 1
  e. Images - JSON Array of strings


##Add following REST APIs :-
1. Get all the posts of users
2. Create a post for user
3. Edit a post of a user
4. Delete a post of user
5. Get all users
6. Get All posts
    Followed REST guidelines while designing APIs



