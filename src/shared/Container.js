/** @jsxImportSource @emotion/core */
import "twin.macro";

export const Container = ({ as: Component = "div", ...props }) => {
  return <Component tw="max-w-7xl mx-auto px-4 sm:px-6 md:px-8" {...props} />;
};
