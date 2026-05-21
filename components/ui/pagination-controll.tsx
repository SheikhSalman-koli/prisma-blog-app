'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationControllData {
  total: number,
  page: number,
  limit: number,
  totalPages: number
}

export function PaginationControll({ metaData }: { metaData: PaginationControllData }) {

  // console.log(metaData);
  const { total, page: currentPage, limit, totalPages } = metaData
  const searchParams = useSearchParams()
   const router = useRouter()

  const navigatePage = (page: number) => {

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
   
    router.push(`?${params.toString()}`)

  }

  const start = (currentPage -1 )*limit + 1
  const end = Math.min(currentPage*limit, total)

  return (
    <div className="flex items-center justify-between px-2 py-4 border-t mt-4">
      <div className="text-sm text-muted-foreground">
        Showing from {start} to {end} of {total} results
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigatePage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigatePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigatePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigatePage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
