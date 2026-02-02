import * as React from "react";

import { twMerge } from "tailwind-merge";
import { SidebarTrigger } from "./sidebar";

type PageProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  title?: string;
};

export function Page({ className, children, title, ...props }: PageProps) {
  return (
    <div className={twMerge("flex flex-col pb-8 gap-2", className)} {...props}>
      <div className="flex flex-1 items-center py-1 -ml-2.5">
        <SidebarTrigger />
        {title && <div className="w-[1px] h-5 bg-gray-300 ml-3 mr-5" />}
        {title && <PageTitle>{title}</PageTitle>}
      </div>
      <div
        className={twMerge("flex flex-col pb-8 gap-5", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

type PageLabelProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

export function PageTitle({ className, children, ...props }: PageLabelProps) {
  return (
    <p className={twMerge("font-semibold text-xl", className)} {...props}>
      {children}
    </p>
  );
}

export function PageHeader({ className, children, ...props }: PageProps) {
  return (
    <div
      className={twMerge(
        "flex flex-1 flex-col md:flex-row gap-3 justify-between items-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
