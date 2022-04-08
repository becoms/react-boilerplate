import qs from "qs";
import { useNavigate, useLocation } from "react-router-dom";
import { useDebounce } from "../shared/useDebounce";

export const useSearch = (searchQuery, key = "search", delay = 300) => {
  const { [key]: search = "" } = searchQuery;
  const navigate = useNavigate();
  const location = useLocation();

  const setSearch = (value) => {
    navigate.to(
      `${location.pathname}${qs.stringify(
        {
          ...searchQuery,
          [key]: value || undefined,
        },
        { addQueryPrefix: true }
      )}`, { replace: true }
    );
  };

  const debouncedSearch = useDebounce(searchQuery.search, delay);

  return { search, debouncedSearch, setSearch };
};
