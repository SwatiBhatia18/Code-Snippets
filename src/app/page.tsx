import { Button } from "@/components/ui/button"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

// export const dynamic = "force-dynamic" // disabling caching 
// export const revalidate = 0 

export default async function Home() {
  const snippets = await prisma.snippet.findMany()
  return (
    <div>
      <h1 className="font-bold text-4xl">Home</h1>
      <div className="flex items-center justify-between">
        <h1>Snippets</h1>
        <Link href="/snippet/new">
          <Button>New</Button>
        </Link>
      </div>
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="flex items-center justify-between bg-gray-200 p-2 my-2 rounded-md "
        >
          <h1>{snippet.title}</h1>
          <Link href={`/snippet/${snippet.id}`}>
            <Button variant={'link'}>View</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
