"use client"
import React from 'react'
import { useState } from 'react';
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from 'rehype-sanitize';
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";


const mkdStr = `
# Write your piece
`;


export default function MarkdownEditor(){
 const [value, setValue] = useState(mkdStr);
  return (
    <div data-color-mode="light" className="w-70 overflow-hidden bg-red-400">
      <MDEditor 
        height={200} 
        value={value}
        preview={'edit'}
        onChange={(value) => setValue(value ?? '')}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        />
      <MDEditor 
        height={200} 
        value={value}
        preview={'preview'}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        />
    </div>
  );
}

