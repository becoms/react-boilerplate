/** @jsxImportSource ../emotion-runtime */
import "twin.macro";

export const Panel = (props) => {
  return (
    <section
      tw="bg-white dark:bg-gray-800 sm:rounded-lg shadow py-6 px-5 sm:px-6 -mx-4 sm:mx-0"
      {...props}
    />
  );
};
