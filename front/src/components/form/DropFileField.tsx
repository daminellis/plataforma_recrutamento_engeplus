"use client";

import { useRef, useState } from "react";
import { AppButton } from "../ui/button/AppButton";
import { FileIcon } from "@radix-ui/react-icons";

export const DropFileField = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aceptedFileTypes = ["pdf", "docx", "jpg", "jpeg"];

  const onClickInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    let isValidFileType = false;

    for (const fileType of aceptedFileTypes) {
      if (file.type.includes(fileType)) {
        setSelectedFile(file);

        isValidFileType = true;
        break;
      }
    }

    if (!isValidFileType) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-5 w-full border-2 border-dashed rounded-md ${
        error && "border-red-500"
      } cursor-pointer p-10 bg-gray-100`}
      onDrop={handleFileDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <div className="flex max-md:flex-col gap-5 justify-start w-full h-full">
        <div className="size-28 rounded-sm max-md:size-20 bg-white flex items-center justify-center">
          <FileIcon className="size-14 text-blue-500" />
        </div>
        <div className="flex flex-col justify-center">
          {selectedFile ? (
            <h3 className="text-gray-700 font-semibold text-xl max-md:text-lg">
              {selectedFile.name}
            </h3>
          ) : (
            <>
              <h3
                className={`${
                  error ? "text-red-500" : "text-gray-700"
                } font-semibold text-xl max-md:text-lg`}
              >
                {error ? "Arquivo inválido" : "Solte aqui o arquivo!"}
              </h3>
              <p className="text-gray-400 text-sm">
                Formatos suportados - PDF, DOCX, JPG e JPEG
              </p>
            </>
          )}
        </div>
      </div>

      <input
        accept={"." + aceptedFileTypes.join(",.")}
        type="file"
        className="hidden"
        name="file"
        id="cv"
        onChange={handleFileSelect}
        ref={fileInputRef}
      />
      <AppButton type="button" size="sm" onClick={onClickInput}>
        Selecionar
      </AppButton>
    </div>
  );
};
