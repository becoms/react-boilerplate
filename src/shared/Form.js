/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import tw from "twin.macro";

export const RequiredAsterisk = (props) => {
  return (
    <span tw="text-red-500 font-medium" {...props}>
      *
    </span>
  );
};

export const Label = ({ children, ...props }) => {
  return (
    <label tw="block text-sm font-medium truncate" {...props}>
      {children}
    </label>
  );
};

export const ErrorMessage = styled("p")(tw`flex text-sm font-medium pt-1 text-red-500`);

export const FormGroup = ({ children, ...props }) => {
  return (
    <div tw="space-y-1" {...props}>
      {children}
    </div>
  );
};

export const Input = styled("input")(
  tw`max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md`
);

export const CheckBox = styled("input")(
  tw`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded`
);

export const TextArea = styled("textarea")(
  tw`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`
);

export const Select = styled("select")(
  tw`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md`
);

/**
 * Helper text that can be used with a `FormGroup`.
 * @type {React.FC<React.HTMLAttributes<HTMLParagraphElement>>}
 * @example
 * <FormGroup>
 *   <Label>The label</Label>
 *   <Input ... />
 *   <HelperText>Some more description</HelperText>
 * </FormGroup>
 */
export const HelperText = ({children, ...props}) => {
  return <p tw="mt-1 max-w-2xl text-sm text-gray-500" {...props}>{children}</p>;
};
