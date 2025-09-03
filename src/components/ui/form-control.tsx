"use client";

import { createContext, type ReactElement, type ReactNode, useId } from "react";
import { WarningIcon } from "../icon";

type FormContextType = {
  id: string;
  isInvalid: boolean;
};
export const FormControlContext = createContext<FormContextType | undefined>(
  undefined,
);

type Props = {
  label: string | ReactElement;
  children: ReactNode;
  errorMessage?: string;
};
export const FormControl = ({ label, children, errorMessage }: Props) => {
  const id = useId();

  return (
    <FormControlContext.Provider value={{ id, isInvalid: !!errorMessage }}>
      <div>
        <div className={"flex flex-col gap-y-0.5"}>
          {typeof label === "string" ? (
            <label htmlFor={id}>{label}</label>
          ) : (
            label
          )}
          {children}
        </div>
        {errorMessage && (
          <div className={"mt-2 grid grid-cols-[auto_1fr] gap-x-2.5"}>
            <WarningIcon />
            <p className={"whitespace-pre-line text-sm"}>{errorMessage}</p>
          </div>
        )}
      </div>
    </FormControlContext.Provider>
  );
};
