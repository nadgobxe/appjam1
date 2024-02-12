import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FetchApi({ handleTokenChange }) {
  const clientId = "2f2adef7bfb447d4a80fe37281c3cb62";
  const redirectUri = "http://localhost:3000/";
  const authEndPoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  const scope = "user-read-private user-read-email playlist-read-private";
  const challengeCode = "S256";

  const [challenge, setChallenge] = useState('');
  const [token, setToken] = useState(() => window.localStorage.getItem("token") || "");
  const [userData, setUserData] = useState({});

  // Function to generate a code verifier for PKCE
  const generateCodeVerifier = (length) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const verifier = generateCodeVerifier(128);

  // Function to generate a code challenge from the verifier
  const generateCodeChallenge = async (codeVerifier) => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  useEffect(() => {
    const fetchChallenge = async () => {
      const challenge = await generateCodeChallenge(verifier);
      setChallenge(challenge);
    };

    fetchChallenge();
  }, [verifier]);

  useEffect(() => {
    // Extract the access token from the URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      window.localStorage.setItem("token", accessToken);
      setToken(accessToken);
      handleTokenChange(accessToken);
      window.location.hash = ''; // Clear the hash to hide the token from the URL
    }
  }, [handleTokenChange]);

  useEffect(() => {
    const checkSpotifyConnection = async () => {
      if (!token) return;

      try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserData(response.data);
        console.log(response.data); // Log user data here
      } catch (error) {
        console.error('Error connecting to Spotify:', error.response || error);
        logout();
      }
    };

    checkSpotifyConnection();
  }, [token]); // Adding token as a dependency so useEffect runs when token changes

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    // Optionally, redirect or update the UI to reflect the logout
  };

  let urlToken = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&code_challenge_method=${challengeCode}&code_challenge=${challenge}`;

  return (
    <>
      <div>
        {!token ? (
          <div>
            <a href={urlToken}>Login</a>
          </div>
        ) : (
          <div className="flex items-center gap-4 justify-end">
            <div className="ml-4">
              <button onClick={logout}>Logout</button>
            </div>
            <div className="flex items-center gap-4">
              <div><h1>{userData.display_name}</h1> </div>
              {userData.images && userData.images.length > 0 && (
                <div className="albumcover">
                  <img className="rounded-3xl shadow-lg shadow-cyan-500/50" src={userData.images[0].url} alt="User Profile" />
                  
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
