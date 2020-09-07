import React from "react";

export const Header = () => (
  <header className="jumbotron text-center">
    <h1 className="display-4">Word Tagging Demo</h1>
    <p className="lead">
      This is a simple Demo for classification and tagging tasks
    </p>
    <hr className="my-4" />
    <p>
      Enter a sentense below to get word tagging. Click on the result to edit
      the tagging result and download!
    </p>
    <p className="lead">
      <a className="btn btn-primary btn-lg" href="https://github.com/h-bar/demofi" target="_blank" rel="noopener noreferrer"  role="button">
        Github
      </a>
    </p>
  </header>
);
