import { mockData } from "./mock-data";
import axios from "axios";
import NProgress from "nprogress";
import './nprogress.css';

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const checkToken = async (accessToken) => { // takes the accessToken we found and checks its validity
  const result = await fetch (
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
  .then((res) => res.json())
  .catch((error) => error.json());

  return result;
};

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
  };

export const getEvents = async () => {
  NProgress.start(); //display progress bars to show app is loading data

  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }

  const token = await getAccessToken(); //check for an access token 

  if(token) { //if token is found, make a GET request to the Google Calendar API
    removeQuery();
    // eslint-disable-next-line no-useless-concat
    const url = `https://enmky08hd1.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
    const result = await axios.get(url); 

    if(result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  //Checking accessToken and if a token is found, call checkToken function, which checks the token’s validity.
  const tokenCheck = accessToken && (await checkToken(accessToken)); 

  if (!accessToken || tokenCheck.error) { // If no token is found (!accessToken), it then checks for an authorization code.
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) { //If no authorization code is found (!code), the user is automatically redirected to the Google Authorization screen
      const results = await axios.get (
        "https://enmky08hd1.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.localStorage.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
}

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code); // takes the code and encodes it using encodeURIComponent
  const { access_token } = await fetch( // uses the encoded code to get our token
    // eslint-disable-next-line no-useless-concat
    `https://enmky08hd1.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`
  ) 
  .then((res) => {
    return res.json();
  })
  .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

