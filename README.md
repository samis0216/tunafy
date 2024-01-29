# Flask React Project

This is the starter for the Flask React project.

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## Deployment through Render.com

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the __dist__ folder located in
the root of your __react-vite__ folder when you push to GitHub. This __dist__
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your __react-vite__ folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the __Dockerfile__, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a __.env__ file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
__.env__ file. As you work to further develop your project, you may need to add
more environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

# Schema Diagram
![Alt text](image.png)
# Unauthorized user
As an unauthorized user when I visit the site I will see a list of popular playlists each with a name, a short description, and cover art. I should be able to see in the footer of the website, relevant links to github, social media links, etc. On the left side should be a navbar that I can use to navigate to different parts of the website including the search, homepage, and a create playlist button in the library section that prompts user to signup or login. If I click to play a song I should be prompted to make a free account in a modal.

# Login
When pressing the button to log in, I should be taken to a new page where I will be prompted for email or username and password. There should also be a sign up link that redirects you to the signup page. On successful login I am redirected to home.

Required:
Username/Email and password

# Signup
When pressing the button to sign up, I should be taken to a new page where I will be prompted for my email address, then a password. There should also be a log in link that redirects you to the login page. On successful signup I am redirected to home.

## Required:
### Email
### Password
* Password should contain at least 8 characters.
The password must contain at least 8 characters. We recommend including at least 1 number and 1 special character.
### Name
* Not empty
### Date of Birth
* Not empty
* Must be older than thirteen


## Optional:
* Gender

# Logout
The logout button should be in a dropdown menu in the top right of the site, and should redirect me to the home page on successful logout.

# Authorized User
As an authorized user when I am logged in to the website I am redirected to a personalized home page with recently listened to music and saved albums/playlists. I should see a profile button in the top right with a Profile option and a Logout option on every page of the website. I should see a Home button in the top left that redirects me to home from any page in the website. Underneath the home button I should see a Upload album button that redirects me to a new page where I can upload a new album and a your library tab that has a button to make a new playlist. I should see an integrated player on the bottom of the page for the current song I am listening to, that has a play button, pause button, next and last song buttons, like button, shuffle button, progress bar, and volume slider.

# Profile page
On the top of my profile page, I should see a profile header on the top of the page with my profile icon, username, and number of public playlists, and a button to edit my profile that takes me to a edit profile modal. Underneath the profile header I should see my created albums, top songs, and my created public playlists. Next to each should be a Show all button that redirects to another page containing the rest of the content.

# Profile edit modal
In the edit profile modal, I should be able to change my account name and/or picture.

# Create a Playlist
On clicking the plus button that is in the Your Library section, I should be taken to a new page that has a blank playlist, with a default name of the latest number playlist created. I should be able to add a photo to my playlist, rename my playlist, and/or add a song from the list provided.
When I have added a song, it should have a button on the very right that has a dropdown that contains a remove from playlist option, a like option, a go to artist page and go to album page option. Each song should have the numbered position in playlist, album cover art, artist name, song name, album name, date added, and duration.

## Liked Songs Playlist
Inside the Library section should be a auto-created playlist that contains all the songs liked by the user.

# Create an Album
On the create an album page, I should be able to upload songs, delete songs, update a song, name the album, and upload album art. For a created album, I should be able to see a header that contains the album name, album cover, artist name, year added, number of songs, and duration. Underneath should be a play button, like button, and a drop down that contains an add to Library option, add to Playlist option, and a Delete album option. There should be the list of songs and each song should have its number, name, artist name and duration.
