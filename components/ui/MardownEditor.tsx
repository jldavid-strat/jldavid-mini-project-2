"use client"
import React from 'react'
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from 'rehype-sanitize';

type MardownEditorProps = {
  value: string;
  onValueChange: (value:string) => void;
}

export default function MarkdownEditor({ value, onValueChange }: MardownEditorProps){

  return (
    <div data-color-mode="light" className="min-w-70 overflow-hidden bg-slate-400 grid grid-cols-1 md:grid-cols-2">
      <MDEditor 
        height={300} 
        value={value}
        preview={'edit'}
        onChange={(val) => onValueChange(val ?? "")}
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

