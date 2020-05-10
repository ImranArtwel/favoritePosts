# Favorite Posts App

This is a simple Express-Vue app that allows the user to mark favorite posts from a list of posts retrieved from an [external API](http://jsonplaceholder.typicode.com/posts).

## Tech stack
- **MongoDB** for persistent storage
- **Express/Node** for backend
- **Vue** for frontend  

## How to run


```bash
1. git clone the repo
2. cd favoritePosts
3. npm install

To run the server:
nodemon server [will run the server on port 5000]

To run the client:
cd client
npm run serve [will run the dev server on port 3000]
```

## Routes
These are the routes supported in this application. You can play around with more routes as shown on the [API page](http://jsonplaceholder.typicode.com/)
```bash

GET	 /posts     -> retrieve all 100 posts 
GET	/posts/search?key=title -> retrieve all posts that includes the search key

GET	 /posts/favorite -> retrieve all favorite posts
GET	 /posts/favorite/search?key=title -> retrieve all favorite posts that includes the search key
POST	/posts/favorite -> create a favorite post
PATCH    /posts/favorite/update -> update a specific post
DELETE   /posts/favorite  -> delete a specific post
```
