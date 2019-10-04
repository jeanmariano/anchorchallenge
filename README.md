# Anchor Web Engineer Challenge
To see a deployed app on production, visit [here](http://jeanchor.herokuapp.com).

## Run Locally
Go into project directory and spin up the server by running:
```
yarn run start
```

In another term session, go into project directory and spin up the client by running:
```
cd client && yarn run start
```

Then go to localhost:5000

## Tools used
- [Create React App](https://create-react-app.dev/)
- Fontawesome
- and everything listed in `package.json`

## Notes
For this project, I set up both a client and a server due to the fact that I have to make a request to an external API. For the client side, I opted to use React because of its streamlined approach to state management. Normally I would spin up React with Webpack and Babel ecosystem from scratch, but for time constraint purposes I opted to use Create React App. For the backend, I'm using Express since it is lightweight enough for this use case.

Because the requirements for the music player was simple, I homebrewed all of the music-playing logic, but in hindsight it might have been a good idea to use an external JS library because if I had more time I would implement more of the features (time count, duration progress bar, etc.).

Before jumping into the code, I drafted a system design diagram and brainstormed simple UI wireframes to make it easy and methodical to implement. I broke down the design into 2 main components: a music player and a track list. The former deals with the component that actually plays the media, and the latter deals with displaying the track metadata. A container component then manages the states in the app, so that both components are on the same page (ha get it-- it's a 1 page app) with regards to the state. 

For the UI design, I lightly researched existing music UI players, and what I had in mind was to use Spotify's existing brand identity and designed something with the official color scheme in mind.
