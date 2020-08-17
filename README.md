# iReporter

Andela Cycle 39 Developer Challenge

# Project Overview

iReporter is a platform that enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the
general public. Users can also report on things that needs government intervention.

# Features
# The User Interface

The user interface or UI is the front-end part of the platform implemented with only HTML, CSS and Javascript. The user interface is the part the user can interact with when they visit the website.
Some of the interactions that can be done with the platform include:
<li> Creating an account and loging in </li>
<li> Creating a red-flag record (An incident linked to corruption). </li>
<li> Creating an intervention record (a call for a government agency to intervene e.g
repair bad road sections, collapsed bridges, flooding e.t.c). </li>
<li> Edit their red-flag or intervention records. </li>
<li> delete their red-flag or intervention records. </li>
<li> Add geolocation (Lat Long Coordinates) to their red-flag or intervention
records. </li>
All these and many more are possible as long as the user has signed up and is logged in to the platform.

# Getting Started

These instructions will get you through the steps required in setting up the project on your local machine for development and testing purposes.

# Prerequisites

<<<<<<< HEAD
Firstly, you need to install node.js on your system by using the link <a href="https://nodejs.org/en"></a>, follow the instructions on the website to get started.</br></br>
Secondly, you need to clone this repository or download the zip file. To do this, you need to install git on your local computer from <a href="https://https://git-scm.com/downloads"></a> so as to be able to access the git bash user interface terminal.</br></br>
Thirdly, make sure you have a text editor like sublimetext, visual studio, atom etc. to be able to type in and edit your codes.</br></br>
=======
Firstly, you need to install node.js on your system by using the link <a href="https://nodejs.org/en">nodejs.org/en</a>, follow the instructions on the website to get started.</br></br>
Secondly, you need to clone this repository or download the zip file. To do this, you need to install git on your local computer from <a href="https://https://git-scm.com/downloads">git-scm.com/downloads</a> so as to be able to access the git bash user interface terminal.</br></br>
Thirdly, make sure you have a text editor like sublimetext, visual studio, atom etc. to be able to type in and edit your codes.

# Installing

Installing the application is a quite easy. After cloning the repository to your local computer with the "git clone" command e.g. git clone https://github.com/perfect090/iReporter.git. Change directory into the folder on your most preferred terminal, let's say git bash and run the command: <strong>npm install</strong>. This will install all the dependencies and development dependencies on your local machine.</br></br>
Once the installation has been completed, the server can be started with the <strong>npm start</strong> command which runs the start script (nodemon app.js --exec babel-node --presets babel-preset-env) in the package.json file.</br></br>
The same process can be used in running the tests by typing the command: <strong>npm start</strong> which runs the test script in the package.json file.

# Api Endpoints

The api endpoints that can currently be accessed are as follows:</br></br>

# GET /api/v1/red-flags/
This retrieves all the red-flag records from the database.

# GET /api/v1/red-flags/:id/
This retrieves a specific red-flag record from the database.

# POST /api/v1/red-flags/
This adds a red flag record to the database.

# PATCH /api/v1/red-flags/:id/
This edits a specific red flag record.

# PATCH /api/v1/red-flags/:id/location/
This edits the location of a specific red-flag record.

# PATCH /api/v1/red-flags/:id/comment/
This edits the comment of a specific red-flag record.

# DELETE /api/v1/red-flags/:id/
This deletes a specific red-flag record.</br></br>

# Deployment

This app has been deployed on the heroku platform and can be accessed by clicking on the link <a href="https://perfect090-ireporter.herokuapp.com">perfect090-ireporter.herokuapp.com</a>

# Author

<strong>Obioha Kingsley</strong>

# License

This project is licensed under the <a href="https://opensource.org/licenses/MIT">MIT license </a>
>>>>>>> 5ac11cdccb9af9dc3e67f96c64307eb31a6729b7
