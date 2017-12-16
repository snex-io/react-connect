import React from "react";
import ReactDOM from "react-dom";

import { SNEXConnect } from "../SNEXConnect";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SNEXConnect onConnection={() => {}} />, div);
});
