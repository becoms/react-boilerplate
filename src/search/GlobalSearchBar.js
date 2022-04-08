/** @jsxImportSource @emotion/react */
import { useId } from "@reach/auto-id";
import { useState } from "react";
import "twin.macro";
import { theme } from "twin.macro";
import { DTOListItem } from "../dtos/DTOList";
import { DTOS, useDTOsQuery } from "../dtos/DTOQueries";
import { EmptyState, EmptyStateTitle } from "../shared/EmptyState";
import { SearchSolidIcon } from "../shared/Icons";
import { List } from "../shared/List";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { Modal } from "../shared/Modal";
import { Filter } from "../shared/QueryHelpers";
import { useDebounce } from "../shared/useDebounce";
import { useDisclosure } from "../shared/useDisclosure";
import { TIRE_TESTS, useTireTestsQuery } from "../tire-tests/TireTestQueries";
import { TireTestListItem } from "../tire-tests/TireTestSimplifiedView";
import { TireListItem } from "../tires/TireList";
import { TIRES, useTiresQuery } from "../tires/TireQueries";

const useGlobalSearch = (search) => {
  const { data: tireTestData } = useTireTestsQuery({
    limit: 5,
    ...Filter.from(
      search && {
        $or: [{ dto: Filter.regex(search) }, { "developer.name": Filter.regex(search) }],
      }
    ),
  });
  const { data: dtoData } = useDTOsQuery({
    limit: 5,
    ...Filter.from(
      search && {
        $or: [
          { value: Filter.regex(search) },
          { tireDimension: Filter.regex(search) },
          { tireRim: Filter.regex(search) },
          { casingReference: Filter.regex(search) },
        ],
      }
    ),
  });
  const { data: tireData } = useTiresQuery({
    limit: 5,
    ...Filter.from(search && { serialNumber: Filter.regex(search) }),
  });

  return {
    isLoading: !tireTestData || !dtoData || !tireData,
    isEmpty:
      tireTestData?.list?.length === 0 &&
      dtoData?.list?.length === 0 &&
      tireData?.list?.length === 0,
    data: {
      [TIRE_TESTS]: tireTestData,
      [DTOS]: dtoData,
      [TIRES]: tireData,
    },
  };
};

const GlobalSearchModalContent = ({ onDismiss, search, onSearchChange, ...props }) => {
  const debouncedSearch = useDebounce(search, 300);
  const { isLoading, isEmpty, data } = useGlobalSearch(debouncedSearch);

  return (
    <>
      <header tw="relative border-b border-gray-200">
        <div tw="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchSolidIcon tw="h-5 w-5 text-indigo-500" />
        </div>
        <input
          tw="border-none focus:ring-0 block w-full rounded-md pl-12 pr-12"
          css={{
            "&::-webkit-search-cancel-button": {
              WebkitAppearance: "none",
              color: theme`colors.gray.400`,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239ca3af'%3E%3Cpath fill-rule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
              width: theme`space.4`,
              height: theme`space.4`,
              cursor: "pointer",
            },
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder="Search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {isLoading && (
          <div tw="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <LoadingIndicator tw="h-5 w-5 text-indigo-500" />
          </div>
        )}
      </header>
      <div
        tw="space-y-12 overflow-y-auto -mx-4 sm:-mx-6"
        onClick={(e) => {
          if (e.target.nodeName === "A") {
            onDismiss();
          }
        }}
        css={{ height: "75vh" }}
      >
        {Object.entries(data)
          .filter(([key, data]) => !!data && data.totalCount !== 0)
          .map(([key, data]) => {
            return (
              <section key={key}>
                <h3 tw="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8 px-4 sm:px-6">
                  {key}
                </h3>
                <List>
                  {data.list.map((item) => {
                    switch (key) {
                      case TIRE_TESTS:
                        return <TireTestListItem key={item._id} tireTest={item} />;
                      case DTOS:
                        return <DTOListItem key={item._id} dto={item} />;
                      case TIRES:
                        return <TireListItem key={item._id} tire={item} />;
                      default:
                        return null;
                    }
                  })}
                </List>
              </section>
            );
          })}
        {isEmpty && (
          <EmptyState>
            <EmptyStateTitle>No results for "{debouncedSearch}"</EmptyStateTitle>
          </EmptyState>
        )}
      </div>
    </>
  );
};

export const GlobalSearchBar = () => {
  const id = useId();
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div tw="w-full flex md:ml-0">
        <label htmlFor={id} tw="sr-only">
          Search
        </label>
        <div tw="relative w-full text-gray-400 focus-within:text-gray-600">
          <div tw="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <SearchSolidIcon tw="h-5 w-5" />
          </div>
          <input
            id={id}
            value={search}
            onChange={(e) => {
              onOpen();
              setSearch(e.target.value);
            }}
            onClick={onOpen}
            css={{
              "&::-webkit-search-cancel-button": {
                WebkitAppearance: "none",
                color: theme`colors.gray.400`,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239ca3af'%3E%3Cpath fill-rule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                width: theme`space.4`,
                height: theme`space.4`,
                cursor: "pointer",
              },
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            tw="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>

      <Modal aria-label="Global search modal" tw="sm:max-w-3xl" isOpen={isOpen} onDismiss={onClose}>
        {isOpen && (
          <GlobalSearchModalContent
            onDismiss={onClose}
            search={search}
            onSearchChange={setSearch}
          />
        )}
      </Modal>
    </>
  );
};
