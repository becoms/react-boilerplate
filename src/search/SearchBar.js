/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import "twin.macro";
import { SearchSolidIcon } from "../shared/Icons";

export const SearchBar = ({ value, onChange, ...props }) => {
  return (
    <div tw="relative rounded-md shadow-sm" {...props}>
      <div tw="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchSolidIcon tw="h-5 w-5 text-gray-400" />
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="search"
        tw="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 border-gray-300 text-sm"
        placeholder="Search"
        aria-label="Search"
      />
    </div>
  );
};
