import { useCallback } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { DeleteIcon } from "../icon";

type Props = {
  file: File | null;
  onChange: (file: File) => void;
  onDelete: () => void;
  options?: Omit<DropzoneOptions, "onDrop" | "multiple">;
};
export const ImageUploader = ({
  file,
  onChange,
  onDelete,
  options = {},
}: Props) => {
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
      className={
        "grid h-24 cursor-pointer place-items-center rounded-md border border-purple-300 bg-white"
      }
      {...getRootProps()}
    >
      <input {...getInputProps()} />
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
