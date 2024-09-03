# URL-Shortener-API

This is a simple URL Shortener API built using Node.js, Express.js, and MongoDB. The API allows users to shorten long URLs and retrieve the original URL using the shortened link.

# Features

Shorten URL: Converts a long URL into a short, easily shareable link.
Redirect URL: Redirects to the original URL when accessing the shortened link.
Statistics: Optionally track the number of times a shortened URL is accessed (if implemented).

# Technologies Used

Node.js: JavaScript runtime environment used to build the server-side logic.
Express.js: Web framework for Node.js used to create the API endpoints.
MongoDB: NoSQL database used to store URLs and their shortened versions.
Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js, used to manage data.
Shortid: Library used to generate unique IDs for shortened URLs.
