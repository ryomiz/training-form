import { type ComponentProps, useCallback, useContext } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { DeleteIcon } from "../icon";
import { FormControlContext } from "./form-control";

type Props = {
  file: File | null;
  onChange: (file: File) => void;
  onDelete: () => void;
  options?: Omit<DropzoneOptions, "onDrop" | "multiple">;
} & Omit<ComponentProps<"div">, "onChange">;
export const ImageUploader = ({
  id: _id,
  file,
  onChange,
  onDelete,
  options = {},
  ...props
}: Props) => {
  const context = useContext(FormControlContext);
  const id = _id ?? context?.id;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file instanceof File) {
        onChange(file);
      }
    },
    [onChange],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    multiple: false,
    ...options,
  });

  return (
    <div
      className={cn(
        "grid h-24 cursor-pointer place-items-center rounded-md bg-white shadow-[inset_0_0_0_1px_theme(colors.purple.300)] transition-[box-shadow]",
        "has-[input[aria-invalid=true]]:bg-red-50 has-[input[aria-invalid=true]]:shadow-[inset_0_0_0_2px_theme(colors.red.500)]",
      )}
      {...getRootProps()}
      {...props}
    >
      <input id={id} aria-invalid={context?.isInvalid} {...getInputProps()} />
      {file ? (
        <div className={"flex items-center gap-x-[5px] px-4"}>
          <p className={"line-clamp-2"}>{file.name}</p>
          <button
            type={"button"}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      ) : (
        <div className={"flex gap-x-2"}>
          <p className={"text-purple-700 underline"}>Upload a file</p>
          <p className={"hidden text-slate-400 sm:block"}>
            or drag and drop here
          </p>
        </div>
      )}
    </div>
  );
};
