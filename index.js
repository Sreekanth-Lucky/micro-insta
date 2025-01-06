const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'miniinsta.db')

const app = express()
app.use(express.json())

let db = null

const initializeServerAndDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log(`Server running at http://localhost:3000/`)
    })
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
  }
}

initializeServerAndDB()

//apis on users

//Add user
app.post('/users', async (request, response) => {
  const {name, mobileNumber, address} = request.body
  const addUserQuery = `
    INSERT INTO
      user(name,mobile_number,address)
    VALUES
    ( 
      '${name}',
      ${mobileNumber},
      '${address}'
    );
  `
  await db.run(addUserQuery)
  response.send('User Added Successfully!!')
})

//Get all users
app.get('/users/', async (request, response) => {
  const getUsersQuery = `
    SELECT
      *
    FROM
      user
    ORDER BY
      id ASC;
  `
  const usersList = await db.all(getUsersQuery)
  response.send(usersList)
})

//Delete User
app.delete('/users/:userId', async (request, response) => {
  const {userId} = request.params
  const deleteUserQuery = `
    DELETE FROM
      user
    WHERE
      id = ${userId};
  `
  await db.run(deleteUserQuery)
  response.send('User Deleted Successfully!!!')
})

//APIs on post table
//Create a post for user
app.post('/posts', async (request, response) => {
  const {title, description, userId, images} = request.body
  const jsonImages = JSON.stringify(images)
  const addPostQuery = `
    INSERT INTO
      post(title,description,user_id,images)
    VALUES(
      '${title}',
      '${description}',
      ${userId},
      '${jsonImages}'
    );
  `
  await db.run(addPostQuery)
  response.send('User Posted Successfully!!')
})

//Get All posts
app.get('/posts/', async (request, response) => {
  const getPostsQuery = `
    SELECT
      *
    FROM
      post
    ORDER BY
      id ASC;
  `
  const postsList = await db.all(getPostsQuery)
  response.send(postsList)
})

//Delete a post of user by userid and postid
app.delete('/posts/:postId/:userId', async (request, response) => {
  const {postId, userId} = request.params

  const deleteUserQuery = `
    DELETE FROM
      post
    WHERE
      id = ${postId}
      AND user_id = ${userId};
  `
  await db.run(deleteUserQuery)
  response.send('Post Deleted Successfully!!!')
})

//Edit a post of a user
app.put('/posts/:postId/:userId', async (request, response) => {
  const {postId, userId} = request.params
  const {images} = request.body
  const jsonImages = JSON.stringify(images)
  const updatepostsQuery = `
    update
      post
    SET
      images = '${jsonImages}'
    WHERE
      id = ${postId}
      AND user_id = ${userId};
  `
  await db.run(updatepostsQuery)
  response.send('Post updated successfully!!!')
})

//Delete post by postid
app.delete('/posts/:postId', async (request, response) => {
  const {postId} = request.params
  const deleteUserQuery = `
    DELETE FROM
      post
    WHERE
      id = ${postId};
  `
  await db.run(deleteUserQuery)
  response.send('Post Deleted Successfully!!!')
})

// Get all the posts of users
app.get('/users/posts', async (request, response) => {
  const getPostsUsers = `
    SELECT
      post.id as post_id,
      post.title as post_title, 
      post.description as post_description,
      user.id as user_id, 
      user.name,
      user.mobile_number,
      post.images
    FROM
      user INNER JOIN post on user.id = post.user_id
    ORDER BY
      user.id
    ;
  `
  const responseArray = await db.all(getPostsUsers)
  response.send(responseArray)
})
