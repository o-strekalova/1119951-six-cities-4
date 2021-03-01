# Personal project «Six Cities»

It’s an SPA made with React/Redux and TypeScript.

## How to run the project:

1.	Clone the repository
`git clone git@github.com:o-strekalova/1119951-six-cities-4.git`
2.	Install dependencies
`npm i`
3.	Run web serever
`npm start`
4.	Open in browser
`https://localhost/1334`

## This project includes four routes:

`/`
Main page where you can choose a city and sort through offers. You can also see them on the map made with leaflet library. You can also favorite offers to see them in the favorites list later. Offers are downloaded from this server: https://4.react.pages.academy/six-cities. Server requests are made with axios and promises.


`/offer/{:id}`
Detailed page of an offer includes reviews section where you can leave a review if you’re logged in. Review form goes through validation and then the data gets sent to the server.

`/login`
Authorization page. This project doesn’t have a registration form so you can enter any email and be “authorized”.

`/favorites`
Click on the email after logging in and you’ll see list of favorited offers.

## Testing
All components have snapshot tests made with Jest. Some of them also have end-to-end tests using Enzyme.

## TypeScript
In this project TypeScript was used for props.

