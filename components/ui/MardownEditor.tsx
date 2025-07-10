"use client"
import React from 'react'
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from 'rehype-sanitize';
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";


export const mkdStr = `
# Write your piece
`;


type MardownEditorProps = {
  value: string;
  onChange: (value:string) => void;
}

export default function MarkdownEditor({ value, onChange }: MardownEditorProps){

  return (
    <div data-color-mode="light" className="min-w-70 overflow-hidden bg-slate-400 grid grid-cols-1 md:grid-cols-2">
      <MDEditor 
        height={300} 
        value={value}
        preview={'edit'}
        onChange={(val) => onChange(val ?? "")}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        />
      <MDEditor 
        height={300} 
        value={value}
        preview={'preview'}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        />
    </div>
  );
}

