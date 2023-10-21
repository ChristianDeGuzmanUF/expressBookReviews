const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //res.send(JSON.stringify(books,null,4));
  let myPromise = new Promise((resolve,reject) => {	
    resolve(JSON.stringify(books,null,4)); 
  })

  myPromise.then((resultMessage) => {
    return res.send(resultMessage);
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  //res.send(books[isbn]);  
  let myPromise = new Promise((resolve,reject) => {	    
    resolve(books[isbn]); 
  })

  myPromise.then((resultMessage) => {
    return res.send(resultMessage);
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  /*  
  var booksByAuthor = {
    books: []
  };
  
  for (const [key, value] of Object.entries(books)) {
    //console.log(`${key}: ${value}`);
    if (value.author == author){
        booksByAuthor.books.push(key,value)
    }    
  }

  res.send(booksByAuthor);
  */
 let myPromise = new Promise((resolve,reject) => {	
    var booksByAuthor = {
     books: []
   };
   
   for (const [key, value] of Object.entries(books)) {
     //console.log(`${key}: ${value}`);
     if (value.author == author){
         booksByAuthor.books.push(key,value)
     }    
   } 
   
     resolve(booksByAuthor); 
   })
 
   myPromise.then((resultMessage) => {
     return res.send(resultMessage);
   })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
/*
  var booksByTitle = {
    books: []
  };
  
  for (const [key, value] of Object.entries(books)) {
    //console.log(`${key}: ${value}`);
    if (value.title == title){
        booksByTitle.books.push(key,value)
    }    
  }

  res.send(booksByTitle);
  */
 let myPromise = new Promise((resolve,reject) => {	
    var booksByTitle = {
      books: []
    };
    
    for (const [key, value] of Object.entries(books)) {
      //console.log(`${key}: ${value}`);
      if (value.title == title){
          booksByTitle.books.push(key,value)
      }    
    } 
    
      resolve(booksByTitle); 
    })
  
    myPromise.then((resultMessage) => {
      return res.send(resultMessage);
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
