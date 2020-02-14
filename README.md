# Teenie Search: In-Gallery App

A custom search application created for Carnegie Museum of Art's Teenie Harris Archive. The Teenie Harris Archive is a collection of over 50,000 negatives, which have been digitally scanned. For this application, the exisiting metadata records were enchanced by python text analysis and additional [image analysis](https://github.com/CreativeInquiry/TeenieHarrisProject). The search is powered by Algolia.

Targets:   
- 9.7 inch iPad, Safari browser, portrait orientation

Demo at [https://teenie-search.herokuapp.com/](https://teenie-search.herokuapp.com/)
- This is the site being served at the museum. For best vewing results, view on an iPad, use the web inspector to emulate a iPad, or resize your browser window to reflect iPad porportions. 

## Development
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### In the *root* directory, you can run:

#### `npm start`
> Starts a node express server which serves the static app from the client/build folder.<br />
> Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

#### `npm run build`
> Runs build script in the client directory (see below) 

#### In the *client* directory, you can run:

#### `npm start`
> Runs the (serverless) app in the development mode.<br />
> Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run build`
> Builds the app for production to the `build` folder.<br />
> It correctly bundles React in production mode and optimizes the build for the best performance.

#### Sample ENV
This application uses several external services:
* [Algolia](https://www.algolia.com/) for search feature
* [Mailgun](https://www.mailgun.com/) for email features
* [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) for analytics

Fill in the missing values below with your own account information, and save to `client/.env`:
```
COLLECTION_REP_EMAIL=
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
REACT_APP_ALGOLIA_API_KEY=
REACT_APP_ALGOLIA_APPLICATION_ID=
REACT_APP_GTM_ID=
```

## Open Source

We're open sourcing the *code* in this repo, feel free to reuse, remix, rethink the coded React application. The Teenie Harris photographs are property of the Carnegie Museum of Art, and are not open source. The Klavika fonts included here are licensed by Carnegie Museum of Art and are not open source.

## Collections As Data

Funding for the development of this application was provided by [Collections as Data: Part to Whole](https://collectionsasdata.github.io/part2whole/)

#### Team
Ed Motznik, Senior Administrator <br/>
Dominique Luster, Project Lead <br/>
Charlene Foggie-Barnett, Disciplinary Scholar <br/>
[Sam Ticknor](https://samt.work), Creative Technologist <br/>

#### Additional Thanks 
[Frank-Ratchye STUDIO for Creative Inquiry](https://github.com/CreativeInquiry) <br/>
Caroline Record <br/>
[Carney](https://carney.co/) <br />


## Learn More
* To learn more about Teenie Harris and Carnegie Museum of Art, visit [https://cmoa.org/art/teenie-harris-archive/](https://cmoa.org/art/teenie-harris-archive/)
* You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
* To learn React, check out the [React documentation](https://reactjs.org/)

