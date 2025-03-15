"use client"
import { Editor } from "@monaco-editor/react"
import React, { useState } from "react"
import type { Snippet } from "@prisma/client"
import { Button } from "./button"
import { saveSnippet } from "@/actions"

const EditSnippet = ({ snippet }: { snippet: Snippet }) => {
  const [code, setCode] = useState(snippet?.code)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEditorChange = (value: string = "") => {
    setCode(value)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      await saveSnippet(snippet.id, code)
      alert("Snippet saved successfully!")
    } catch (err) {
      console.error(err)
      setError("Failed to save the snippet.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSave} className="flex items-center justify-between">
        <h1 className="font-bold text-xl">Your Code Edit:</h1>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      <Editor
        height="40vh"
        language="javascript" 
        value={code} 
        theme="vs-dark"
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default EditSnippet
