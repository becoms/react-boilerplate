/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
// eslint-disable-next-line no-unused-vars
import tw from "twin.macro";
import { Panel } from "./Panel";
import { Skeleton } from "./Skeleton";

export const Table = ({ thead, tfoot, children }) => (
  <table tw="table-fixed w-full divide-y divide-gray-300">
    <thead tw="bg-gray-50">
      {thead}
    </thead>
    <tbody tw="divide-y divide-gray-200 bg-white">
      {children}
    </tbody>
    <tfoot>
      {tfoot}
    </tfoot>
  </table>
);

export const Td = styled("td")(tw`px-3 py-4 text-sm text-gray-500 truncate`);

export const Th = styled("th")(tw`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 truncate`);

const CrudListItemSkeleton = () => (
  <tr><Td></Td><Td></Td><Td></Td><Td></Td><Td></Td></tr>
);

export const SkeletonTable = () => {
  const skeletonLines = Array.from({ length: 5 }, (_, index) => (
    <CrudListItemSkeleton key={index} />
  ));
  return (
    <>
      <Skeleton tw="bg-gray-200 mt-8" />
      <Panel tw="mt-2">
      <Table thead={skeletonLines} tfoot={skeletonLines}>
        {skeletonLines}
      </Table>
      </Panel>
    </>
  );
};
