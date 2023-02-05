import "./App.css";
import LobyPage from "./components/LobyPage/LobyPage";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">{<LobyPage />}</div>;
    </BrowserRouter>
  );
}

export default App;
