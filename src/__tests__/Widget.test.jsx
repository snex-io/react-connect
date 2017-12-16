import React from "react";
import renderer from "react-test-renderer";

import { Widget } from "../Widget.jsx";

it("renders logo face when given nothing", () => {
  const tree = renderer.create(<Widget />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders throbber when given busy flag", () => {
  const tree = renderer.create(<Widget busy />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders URL face when given url", () => {
  const tree = renderer.create(<Widget url="https://my.text/url" />).toJSON();
  expect(tree).toMatchSnapshot();
});
