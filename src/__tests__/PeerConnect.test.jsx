import React from "react";
import renderer from "react-test-renderer";

import { PeerConnect } from "../PeerConnect.jsx";

describe("PeerConnect", () => {
  let onConn;

  beforeEach(() => {
    onConn = jest.fn();
  });

  it('busy flag "false" and url "null" propagated by default', () => {
    const tree = renderer
      .create(
        <PeerConnect onConnection={onConn}>
          <div />
        </PeerConnect>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
