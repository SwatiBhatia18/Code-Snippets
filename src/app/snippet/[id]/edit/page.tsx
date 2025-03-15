import EditSnippet from "@/components/ui/EditSnippet"
import { prisma } from "@/lib/prisma"
import React from "react"

const EditPageSnippet = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const snippet = await prisma.snippet.findUnique({
    where: { id: parseInt(id) },
  })

  if (!snippet) {
    return <div>Snippet not found</div>
  }

  return <EditSnippet snippet={snippet} />
}

export default EditPageSnippet
