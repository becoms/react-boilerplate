/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import "twin.macro";

const bounce = keyframes({
  "0%, 33%, 100%": {
    opacity: 0.25,
    transform: "scale(0.5)",
  },
  "66%": {
    opacity: 1,
    transform: "scale(1.25)",
  },
});

const LoadingIndicatorDot = (props) => {
  return (
    <div
      tw="h-1 w-1 rounded-full"
      css={{
        backgroundColor: "currentColor",
        animationName: bounce,
        animationIterationCount: "infinite",
        animationDuration: "1s",
        animationTimingFunction: "linear",
      }}
      {...props}
    />
  );
};

export const LoadingIndicator = (props) => {
  return (
    <div tw="flex items-center space-x-0.5" {...props}>
      <LoadingIndicatorDot />
      <LoadingIndicatorDot css={{ animationDelay: "0.33s" }} />
      <LoadingIndicatorDot css={{ animationDelay: "0.66s" }} />
    </div>
  );
};
