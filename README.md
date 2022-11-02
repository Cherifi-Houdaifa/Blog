# Blog RESTful API
### A Blog API with a CMS and a CLIENT
In this project I applied what i learned about RESTful APIs to build a full working Blog API with a CMS and a Client (although they don't look good 😁).
with this now. I can build a full stack MERN app
### Tech Stack For API Server
- Express Js and Passportjs for authentication
### Tech Stack For CMS and CLIENT
- ReactJS
- Webpack for bundling

### How to run
First, you need to download the repo and have a mongodb Cluster `cd server` and create a dotenv file `.env` which Have:
`DB_URI="your mongo db connection url"`</br>
`JWT_SECRET="You can make this what you want"`</br>
But you need to add a user to the authors collection with a username and password (password need to be hashed using bcrypt)
You can start the server using `npm start`

Second, you set up the client and cms by adding a dotenv file which will have
`mode="production"` and `SERVER_URL="this is the url of the server (if you are hosting this locally then it must be http://localhost:3000)"`
and the you run `npm run serve`.
</br>
And That's All 😁
### License
- MIT license
