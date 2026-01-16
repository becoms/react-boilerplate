import * as React from "react";

import { twMerge } from "tailwind-merge";

type PageProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function Page({ className, children, ...props }: PageProps) {
  return (
    <div className={twMerge("flex flex-col pb-8 pt-3 gap-5", className)} {...props}>
      {children}
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
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
