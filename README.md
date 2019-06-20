=======================

**Live Demo**: https://

A Web application for **Cubic Bird Coding Acadamy** student and teacher management.

### Testimonials

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [List of Packages](#list-of-packages)
- [Contributing](#contributing)
- [License](#license)

Features
--------

- **Local Authentication** using Username and Password
- Flash notifications
- MVC Project Structure
- Sass stylesheets (auto-compiled via middleware)
- Bootstrap 4 + Extra Themes
- **Account Management**
- CSRF protection

Prerequisites
-------------

- [MongoDB](https://www.mongodb.com/download-center/community)
- [Node.js 8.0+](http://nodejs.org)

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/yik3000/cubic-bird.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install

# Then simply start your app
node app.js
```


```bash
# start ngrok to intercept the data exchanged on port 8080
./ngrok http 8080
```

**Note:** highly recommend installing [Nodemon](https://github.com/remy/nodemon).
It watches for any changes in your  node.js app and automatically restarts the
server. Once installed, instead of `node app.js` use `nodemon app.js`. It will
save you a lot of time in the long run, because you won't need to manually
restart the server each time you make a small change in code. To install, run
`sudo npm install -g nodemon`.


List of Packages
----------------

| Package                         | Description                                                             |
| ------------------------------- | ------------------------------------------------------------------------|
| @octokit/rest                   | GitHub API library.                                                     |
| bcrypt                          | Library for hashing and salting user passwords.                         |
| body-parser                     | Node.js body parsing middleware.                                        |
| chai                            | BDD/TDD assertion library.                                              |
| chalk                           | Terminal string styling done right.                                     |
| cheerio                         | Scrape web pages using jQuery-style syntax.                             |
| clockwork                       | Clockwork SMS API library.                                              |
| compression                     | Node.js compression middleware.                                         |
| connect-mongo                   | MongoDB session store for Express.                                      |
| dotenv                          | Loads environment variables from .env file.                             |
| errorhandler                    | Development-only error handler middleware.                              |
| eslint                          | Linter JavaScript.                                                      |
| eslint-config-airbnb-base       | Configuration eslint by airbnb.                                         |
| eslint-plugin-chai-friendly     | Makes eslint friendly towards Chai.js 'expect' and 'should' statements. |
| eslint-plugin-import            | ESLint plugin with rules that help validate proper imports.             |
| express                         | Node.js web framework.                                                  |
| express-flash                   | Provides flash messages for Express.                                    |
| express-session                 | Simple session middleware for Express.                                  |
| express-status-monitor          | Reports real-time server metrics for Express.                           |
| express-validator               | Easy form validation for Express.                                       |
| fbgraph                         | Facebook Graph API library.                                             |
| instagram-node                  | Instagram API library.                                                  |
| lastfm                          | Last.fm API library.                                                    |
| lob                             | Lob API library.                                                        |
| lodash                          | A utility library for working with arrays, numbers, objects, strings.   |
| lusca                           | CSRF middleware.                                                        |
| mocha                           | Test framework.                                                         |
| mongoose                        | MongoDB ODM.                                                            |
| morgan                          | HTTP request logger middleware for node.js.                             |
| multer                          | Node.js middleware for handling `multipart/form-data`.                  |
| node-foursquare                 | Foursquare API library.                                                 |
| node-linkedin                   | LinkedIn API library.                                                   |
| node-sass                       | Node.js bindings to libsass.                                            |
| node-sass-middleware            | Sass middleware compiler.                                               |
| nyc                             | Coverage test.                                                          |
| nodemailer                      | Node.js library for sending emails.                                     |
| passport                        | Simple and elegant authentication library for node.js.                  |
| passport-facebook               | Sign-in with Facebook plugin.                                           |
| passport-github                 | Sign-in with GitHub plugin.                                             |
| passport-google-oauth           | Sign-in with Google plugin.                                             |
| passport-instagram              | Sign-in with Instagram plugin.                                          |
| passport-linkedin-oauth2        | Sign-in with LinkedIn plugin.                                           |
| passport-local                  | Sign-in with Username and Password plugin.                              |
| passport-openid                 | Sign-in with OpenId plugin.                                             |
| passport-oauth                  | Allows you to set up your own OAuth 1.0a and OAuth 2.0 strategies.      |
| passport-snapchat               | Sign-in with Snapchat plugin.                                           |
| passport-twitter                | Sign-in with Twitter plugin.                                            |
| paypal-rest-sdk                 | PayPal APIs library.                                                    |
| pug (jade)                      | Template engine for Express.                                            |
| request                         | Simplified HTTP request library.                                        |
| sinon                           | Test spies, stubs and mocks for JavaScript.                             |
| sinon-mongoose                  | Extend Sinon stubs for Mongoose methods to test chained methods easily. |
| stripe                          | Offical Stripe API library.                                             |
| supertest                       | HTTP assertion library.                                                 |
| tumblr.js                       | Tumblr API library.                                                     |
| twilio                          | Twilio API library.                                                     |
| twit                            | Twitter API library.                                                    |
| validator                       | Used in conjunction with express-validator in **controllers/api.js**.   |





Contributing
------------

If something is unclear, confusing, or needs to be refactored, please let me know.
Pull requests are always welcome, but due to the opinionated nature of this
project, I cannot accept every pull request. Please open an issue before
submitting a pull request. This project uses
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with a
few minor exceptions. If you are submitting a pull request that involves
Pug templates, please make sure you are using *spaces*, not tabs.

License
-------

The MIT License (MIT)

Copyright (c) 2014-2019 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
