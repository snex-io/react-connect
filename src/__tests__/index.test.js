import React from "react";

import { SNEXConnect as SNEXConnectSRC } from "../SNEXConnect";
import { PeerConnect as PeerConnectSRC } from "../PeerConnect";

import SNEX, { PeerConnect } from "../";

it("exports complete widget", () => {
  expect(SNEX).toBe(SNEXConnectSRC);
});

it("exports PeerConnect individually", () => {
  expect(PeerConnect).toBe(PeerConnectSRC);
});
