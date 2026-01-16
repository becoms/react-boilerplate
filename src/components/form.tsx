import { twMerge } from "tailwind-merge";

export const RequiredAsterisk = () => {
  return <span className="text-red-500 font-medium">*</span>;
};

interface LabelProps {
  children: React.ReactNode;
}

export const FormErrors = ({ children, ...props }: LabelProps) => {
  return (
    <label className="block text-xs font-medium leading-6 text-red-500" {...props}>
      {children}
    </label>
  );
};

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
}

export const Label = ({ children, htmlFor, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium leading-6 text-zinc-700"
      {...props}
    >
      {children}
    </label>
  );
};

export const SubLabel = ({ children, htmlFor, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-medium leading-6 text-zinc-700"
      {...props}
    >
      {children}
    </label>
  );
};

interface FormGroupProps {
  columnView?: boolean;
  children: React.ReactNode;
}

export const FormGroup = ({ children, ...props }: FormGroupProps) => {
  return (
    <div className="flex flex-col gap-2" {...props}>
      {children}
    </div>
  );
};

export const SubFormGroup = ({ children, ...props }: FormGroupProps) => {
  return (
    <div className="flex flex-col" {...props}>
      {children}
    </div>
  );
};

export const FormGroupByTwo = ({
  columnView,
  children,
  ...props
}: FormGroupProps) => {
  return (
    <div
      className={twMerge([
        columnView && "sm:grid-cols-1",
        "grid grid-cols-1 gap-4 sm:grid-cols-2",
      ])}
      {...props}
    >
      {children}
    </div>
  );
};
