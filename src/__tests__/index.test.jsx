import React from "react";
import ReactDOM from "react-dom";
import SNEX from "../index.jsx";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SNEX onConnection={() => {}} />, div);
});
