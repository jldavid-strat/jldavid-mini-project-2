"use client"

import MDEditor from "@uiw/react-md-editor";

interface MarkdownContentProps {
    source: string
    colorMode: string
}

export default function MarkdownContent({source, colorMode}: MarkdownContentProps){
    return (
        <div data-color-mode={colorMode}><MDEditor.Markdown source={source}/></div>
    )

}