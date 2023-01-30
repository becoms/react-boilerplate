/** @jsxImportSource @emotion/react */
import "twin.macro";
import { useGetQuery } from "../../APIs";

export function TestPage() {
  const { data, status, error } = useGetQuery();
  const items = (data?.list as Array<unknown>) ?? [];
  return (
    <>
      {status === "error" && <div>{JSON.stringify(error)}</div>}
      {status === "success" && (
        <div tw="relative bg-gray-50">
          <main tw="lg:relative">
            <div tw="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
              <div tw="px-4 sm:px-8 lg:w-2/3 xl:pr-16">
                <h1 tw="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  <span tw="block text-indigo-600 xl:inline">
                    Data from backend
                  </span>
                </h1>
                <div tw="mt-10 sm:flex sm:justify-center lg:justify-start">
                  <ul
                    role="list"
                    tw="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {items.map(
                      (item: {
                        name: string;
                        color: string;
                        status: string;
                      }) => (
                        <li
                          key={item.name}
                          tw="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                        >
                          <div tw="flex w-full items-center justify-between space-x-6 p-6">
                            <div tw="flex-1 truncate">
                              <div tw="flex items-center space-x-3">
                                <h3 tw="truncate text-sm font-medium text-gray-900">
                                  {item.name}
                                </h3>
                                <span tw="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                  {item.status}
                                </span>
                              </div>
                              <p tw="mt-1 truncate text-sm text-gray-500">
                                {item.color}
                              </p>
                            </div>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div tw="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/3">
              <img
                tw="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                alt=""
              />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
