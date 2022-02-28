MOVIE TRIVIA
- A react/node based web application that allows users play and create trivia questions based on movies using the IMBD api as well as other APIs

SETUP
- After cloning the app, create your .env file and populate it with your rapidAPI key, labeled IMBD_API, as well as your session secret.
- Run "yarn install" in the directory to add all relevant dependencies
- Go to the server directory in the application and run "createdb movie-trivia_development" to create the database
- Run "yarn migrate:latest" to initialize the tables in the application
- Run "yarn db:seed" to populate the database with initial data to test the application

CURRENT FEATURES
- Working trivia game
- Ability to add new questions as a user
- Leaderboard page

UPCOMING FEATURES
- Improved styling
- Full user generated question sets
- Refactored API usage
- Trending page for question sets
- Quality of life features (search bar, add questions with movie title instead of imbdID, etc.)
