/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import { Button } from "./Buttons";

export const List = styled("ul")(tw`divide-y divide-gray-200`);

export const ListItem = styled("li")(tw`relative`);

export const ListItemContent = styled("div")(
  tw`flex-1 px-4 py-4 sm:px-6 space-y-2 truncate`
);

export const ListItemRow = styled("div")(
  tw`flex items-center justify-between space-x-2 truncate`
);

export const ListItemLink = styled(Link)(
  tw`focus:outline-none hocus:bg-gray-50`
);

export const ListItemMeta = styled("ul")(tw`hidden sm:flex space-x-6 truncate`);

export const ListItemMetaTag = styled("li")(
  tw`flex items-center text-sm text-gray-500 truncate svg:(flex-shrink-0 h-5 w-5 text-gray-400) space-x-1.5`
);

export const ListItemEmptyMetaTag = ({ children = "n.c.", ...props }) => (
  <span tw="text-gray-300" {...props}>
    {children}
  </span>
);

const ListPaginationEllipsis = () => {
  return (
    <span tw="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
      ...
    </span>
  );
};

const createPaginationWithEllipsis = ({ page, pageCount }) => {
  const delta = 2;
  const left = page - delta;
  const right = page + delta + 1;

  const range = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= left && i < right)) {
      range.push(i);
    }
  }

  const rangeWithDots = [];
  let previousPageInRange;
  for (const i of range) {
    if (previousPageInRange) {
      if (i - previousPageInRange === 2) {
        rangeWithDots.push(previousPageInRange + 1);
      } else if (i - previousPageInRange !== 1) {
        rangeWithDots.push(null);
      }
    }
    rangeWithDots.push(i);
    previousPageInRange = i;
  }

  return rangeWithDots;
};

const PageButton = ({ currentPage, setPage, page }) => (
  <Button
    onClick={() => setPage(page)}
    tw="-mt-px border-t-2 px-4 inline-flex items-center text-sm font-medium text-gray-500 hover:border-gray-300 focus:outline-none focus:border-gray-400 transition ease-in-out duration-150"
    css={
      page === currentPage ? tw`border-indigo-500 pointer-events-none` : tw`border-transparent`
    }
  >
    {page}
  </Button>
);

const PrevButton = ({ currentPage, setPage }) => (
  <Button
    onClick={() => setPage(currentPage - 1)}
    tw="-mt-px border-t-2 border-transparent inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150"
    css={currentPage <= 1 && tw`opacity-50 pointer-events-none`}
  >
    <ArrowNarrowLeftIcon tw="mr-3 h-5 w-5 text-gray-400" />
    Précédent
  </Button>
);

const NextButton = ({ currentPage, setPage, pageCount }) => (
  <Button
    onClick={() => setPage(currentPage + 1)}
    tw="-mt-px border-t-2 border-transparent inline-flex items-center text-sm font-medium text-gray-500 hover:border-gray-300 focus:outline-none focus:border-gray-400 transition ease-in-out duration-150"
    css={currentPage >= pageCount && tw`opacity-50 pointer-events-none`}
  >
  Suivant
  <ArrowNarrowRightIcon tw="ml-3 h-5 w-5 text-gray-400" />
</Button>
);

/** @type {React.FC<{ useSearchQuery: function, page: number, pageSize: number, totalCount: number }>} */
export const ListPagination = ({
  page: currentPage,
  setPage,
  pageSize,
  totalCount,
}) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  const pagination = createPaginationWithEllipsis({
    page: currentPage,
    pageCount,
  }).map((page, index) => (
    typeof page === "number" ? <PageButton key={index} page={page} setPage={setPage} currentPage={currentPage} /> : <ListPaginationEllipsis key={index} />
  ));

  return pageCount === 1 ? "" : (
    <nav tw="px-4 flex items-center justify-between sm:px-0 mt-4">
      <div tw="w-0 flex-1 flex"><PrevButton currentPage={currentPage} setPage={setPage} /></div>
      <div tw="hidden md:flex">
        {pagination}
      </div>
      <div tw="w-0 flex-1 flex justify-end">
        <NextButton currentPage={currentPage} setPage={setPage} />
      </div>
    </nav>
  );
};

export const ListCheckbox = (props) => {
  return (
    <input
      type="checkbox"
      tw="absolute left-0 top-0 -mt-2 -ml-2 bg-gray-100 ring ring-transparent ring-offset-4 ring-offset-gray-100 focus:(ring-indigo-500) not-checked:hover:border-gray-400 h-4 w-4 text-indigo-600 border-gray-300 rounded"
      {...props}
    />
  );
};

export const ListHeaderCheckbox = ({ indeterminate, ...props }) => {
  return (
    <input
      type="checkbox"
      ref={(el) => {
        if (el) {
          el.indeterminate = el.checked && indeterminate;
        }
      }}
      tw="flex-shrink-0 ml-0 sm:ml-4 xl:-ml-8 bg-gray-100 ring ring-transparent ring-offset-4 ring-offset-gray-100 focus:(ring-indigo-500) h-4 w-4 text-indigo-600 border-gray-300 rounded not-checked:hover:border-gray-400"
      {...props}
    />
  );
};
