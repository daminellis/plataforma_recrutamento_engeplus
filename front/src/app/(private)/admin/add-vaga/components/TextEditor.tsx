"use client";

import { useState } from "react";
import Editor from "react-simple-wysiwyg";

export const TextEditor = () => {
  const [html, setHtml] = useState<string>("");
  return (
    <div>
      <label
        htmlFor="descricao"
        className="text-sm font-medium text-gray-700 mb-2"
      >
        Descrição
      </label>
      <Editor
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        containerProps={{ style: { resize: "vertical", height: 200 } }}
      />
      <textarea
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        className="hidden"
        name="descricao"
        id="descricao"
      />
    </div>
  );
};
