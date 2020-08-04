/** @jsx jsx */
import { jsx } from "@emotion/core";
import "twin.macro";

export const ChevronLeftIcon = (props) => {
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const ChevronRightIcon = (props) => {
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};
