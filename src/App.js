import React from "react";
import { UserInputs } from "./demofi/components/userInputs";
import { ResultsDisplay } from "./demofi/components/resultsDisplay";
import { Header } from "./demofi/components/header";
import { Footer } from "./demofi/components/footer";
import { Submit } from "./demofi/components/submit";
import { Download } from "./demofi/components/download";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="bg-light mb-5">
        <div className="container">
          <section>
            <UserInputs />
            <Submit />
          </section>
          <section>
            <ResultsDisplay />
            <Download />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
