import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Button from "./Button";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('should render children correctly',  () => {
  const stopHandler = jest.fn();
  act(() => {
    render(<Button handleClick={stopHandler} variant="start">Start</Button>, container);
  });
  expect(container.classContent).toBe('Start')
});
