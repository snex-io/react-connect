import React from "react";

import { SNEXConnect as SNEXConnectSRC } from "../SNEXConnect.jsx";
import { PeerConnect as PeerConnectSRC } from "../PeerConnect.jsx";

import SNEX, { PeerConnect } from "../index.js";

it("exports complete widget", () => {
  expect(SNEX).toBe(SNEXConnectSRC);
});

it("exports PeerConnect individually", () => {
  expect(PeerConnect).toBe(PeerConnectSRC);
});
