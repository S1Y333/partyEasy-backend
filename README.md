#  Party Easy App (Backend)

  

##  App Overview

 
The app is designed to organize party easily but also include almost everything for holding a party



###  Problem

City life is around "BUSY". We're all busy with work, kids and everyday work & life. Sometimes we really want to organize a party to reunion with old friends or team members, even a surprise party for kids or your family, but planning a party is time consuming. Here, our app is to the rescue.

  

###  User Profile

  

Anyone who wants to organize a party, small or big.

  

##  Backend Description

Backend handle all the database interaction using TypeORM, real-time data getting using Puppeteer

##  Implementation

###  Tech Stack

--NodeJS
--TypeScript
--Firebase Admin
--Socket.io
--Multer
--TypeORM
--Puppeteer
--Unsplash API
###  Sitemap

screenshots the folder structure
 
###  Endpoints

####package: 
<img width="584" alt="Screen Shot 2024-05-07 at 9 59 39 AM" src="https://github.com/S1Y333/partyEasy-backend/assets/105386341/1d45794d-bbdf-4bc8-b257-9b3636f4f3f5">

####user: 
<img width="733" alt="Screen Shot 2024-05-07 at 10 00 01 AM" src="https://github.com/S1Y333/partyEasy-backend/assets/105386341/82a9d785-63de-478c-b9e6-207b79dae96b">

####venue data:
<img width="408" alt="Screen Shot 2024-05-07 at 10 00 23 AM" src="https://github.com/S1Y333/partyEasy-backend/assets/105386341/09ec51ad-9ea6-4940-91de-aa8f15b01485">

###  Usage

npm i 
set up .env environment variables
config firebase admin file
npm start to run the backend

#### Seed data
npm run seed

#### Synchronize databse structure
npm run schema:sync

### Database structure

<img width="609" alt="Screen Shot 2024-05-07 at 9 57 49 AM" src="https://github.com/S1Y333/partyEasy-backend/assets/105386341/a47ac5e4-58db-4824-b2f3-655194595099">

##  Features


#### Authentication

User Login 
User Signup -> Verfication Email ->Signup Complete Page (user can upload avatar and customize their username)

Login success -> User Profile Page -> Create party package or log out

**Algorithm brief:** Frontend user authentication is handled by google firebase authentication, when logging user's authentication token will be sent to backend and will be verified by firebase admin (middleware). If successful, user can access their personal page, like profile page.

----
#### Get party recommendation 

Cover Page (Click on PLAN NOW) -> Fill in Questionnaire (address field is integrated with Google autoComplete function) -> Generate recommended package with unsplash API provided cover photo.

**Algorithm brief:** compare the location user entered  with the venue locations in db to find the venue which is located within radius (default 500km) and price is around 60% of the total budget(user entered). 

Then pick the drink under user's choice (non-alcohol or alcohol) also the price of the drink is caculated based on requested number of guests and the budget.

Then pick the food under user's choice category also the food price, the number of guests and the budget

---
#### Real-time Chat

On the packagelist page, A real-time chatting room is provided to ask instant questions to peers

---
#### Web Scrapping data

Integrated with Puppeteer to get real venue data and stored in database (from https://www.peerspace.com/pages/listings/627c4df5c986d7000e949580?sort_order=1), including location, numbers of people can accommodate, price/ per hour 

--
#### TypeORM to manage db

Implemented TypeORM Active Record pattern to create entities that maps to the database tables, which is easy to create and maintain database. 

The changes made to database structure will be happening in code instead of database. After changing the structure, run scripts ( npm run schema:sync), so the database will be updated.

--

##  4. More info

####  Screenshots

Live Chat Room
<img width="605" alt="Screen Shot 2024-05-07 at 1 18 23 PM" src="https://github.com/S1Y333/partyEasy-backend/assets/105386341/6c90c6c5-ca0d-402c-8d8e-0cdcfca6b80a">


