# HaikHoo
## About The Project

A website that allows shy poets to share their poems anonymously. Users can post poems with a gif attached to it, make comments and react (like, funny and feeling emotional) to the posts. 

Visit the website [here](https://haikhoo.netlify.app/)!

## Local Installation & Usage

### Installation

1. Clone the repo.
2. Navigate to the root directory.
3. Run `npm install` to install dependancies.
4. Change the url that the client is fetching data from to your localhost.

### Usage
1. Open the `index.html` in your web browser, the client is served from API hosted on Heroku. If you want to launch the API locally follow the steps below.
2. Navigate to `server` directory.
3. Run `node index.js` to launch the api.
4. Navigate to `/client/static/js/requestHandlers.js` and change the url `http://localhost:3000` so that the client is fetching data from to your api.
5. Navigate to `/client`.
6. Run `npm run dev` to update the script.

#### Now you can try exploring and modifying if locally!

## Technologies
* HTML
* CSS
* JavaScript
* [Express.js](https://expressjs.com/)
* [Jest](https://jestjs.io/)

## Process

1. Started by thinking about the idea of the website.
2. Designed the basic layout and what features should be on the website.
3. Built the back-end of the website and wrote tests for it.
4. Deployed the back-end to [Heroku](https://www.heroku.com/).
5. Built the front-end, wrote tests as it was developed.
6. Added icons, favicon, background and overall styling.
7. Wrote more tests to imrpove test coveage.
8. Deployed the front-end to [Netlify](https://www.netlify.com/).
9. Prepared presentation!

## Wins & Challenges

### Wins
* Managed to complete the project within the limited time.
* Successfully deployed both the front-end and the back-end to Netlify and Heroku.

### Challenges
* Had difficulties on using the jest mock function.
* Test coverage can be improved.
* JSON file may not be an optimal form of database for this use case. 
