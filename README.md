# Introduction

 This MERN web application allows users to create,update and delete their posts, while also allowing the user to like other posts.https://memories4514.netlify.app/
 
 
 
 
 
 
 
#Libraries and details.

#Frontend
react and redux libraries being the basic ones to provide the structure and handle all the state management,react-google-login allows us to log the user in and create posts with the profileObj and token that the google provides.
react-file-base64 was used to convert the pics and store in mongodb and axios to do all the API calls

#backend
Node along with express and mongoose make up a backend that serves the react project with the all the data by fetching it from mongoDB using mongoose model ,we also provide the user with security by generating a token using their gmail and hashing their passwords with bcrypt.js


 
 
