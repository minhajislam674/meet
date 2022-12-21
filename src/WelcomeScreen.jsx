import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
        (
            <div className="WelcomeScreen">
                <div className="log-in">
                    <h1 id="welcome-headline">Welcome to the Meet app</h1>
                    <p id="welcome-text">Log in to see upcoming events around the world for full-stack developers</p>
                    <div className="button_cont" align="center">
                        <div className="google-btn">
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google sign-in"/>
                            </div>
                            <button onClick={() => { props.getAccessToken() }} rel="nofollow noopener" className="btn-text" aria-label="google sign in">
                                <b>Sign in with google</b>
                            </button>
                        </div>
                    </div>
                    <a id="welcome-privacy" href="https://minhajislam674.github.io/meet/privacy.html" rel="nofollow noopener">Privacy policy</a>
                </div>
            </div>
        )
        : null
}
export default WelcomeScreen;