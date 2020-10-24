import { jsx as _jsx } from "@emotion/core";

export { Fragment } from "react";

export const jsx = (Component, { children, ...otherProps }, maybeKey) =>
  _jsx(Component, maybeKey ? { ...otherProps, key: maybeKey } : otherProps, children);

export const jsxs = (Component, { children, ...otherProps }, maybeKey) =>
  _jsx(Component, maybeKey ? { ...otherProps, key: maybeKey } : otherProps, ...children);
