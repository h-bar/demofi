import React from "react";
import { UserInputs } from "./demofi/components/userInputs";
import { ResultsDisplay } from "./demofi/components/resultsDisplay";
import { Header } from "./demofi/components/header";
import { Footer } from "./demofi/components/footer";
import { Submit } from "./demofi/components/submit";
import { Download } from "./demofi/components/download";


import { useSelector } from "react-redux";
import { selectAppState } from "./demofi/slice";

function App() {
  let appState = useSelector(selectAppState)
  return (
    <div className="App">
      <Header />
      <div className="bg-light mb-5">
        <div className="container">
          <section>
            <UserInputs />
            { appState !== "init" ? <Submit /> : null }
          </section>
          {appState === "succeeded" 
            ? <section>
                <ResultsDisplay />
                <Download />
              </section>
            : null }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
