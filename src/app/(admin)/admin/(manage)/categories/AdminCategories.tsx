"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pen, SortAsc, SortDesc, Trash2, Plus } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import type { CategoryType } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DeleteCategoryDialog from "@/components/admin/delete-category-dialog"
import EditCategoryForm from "@/components/admin/edit-category-form"
import AddCategoryForm from "@/components/admin/add-category-form"

interface AdminCategoriesParams {
  page: number | 1
  totalPages: number
  categories: CategoryType[]
}

const AdminCategories = ({ page, totalPages, categories }: AdminCategoriesParams) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const isAddDialogOpen = searchParams.get("add") === "true"
  const editCategoryId = searchParams.get("edit")
  const deleteCategoryId = searchParams.get("delete")
  const order = searchParams.get("order")

  const openDialog = (type: "add" | "edit" | "delete", id?: string) => {
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.set(type, id || "true")
    router.replace(newUrl.toString(), { scroll: false })
  }

  const handlePaging = (newPage: number) => {
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.set("page", newPage.toString())
    router.push(newUrl.toString())
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600">Organize your marble product categories</p>
        </div>
        <Button onClick={() => openDialog("add")} className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Controls */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-end">
          {/* Sort Order */}
          <Button
            variant="outline"
            onClick={() => {
              const newOrder = searchParams.get("order") === "asc" ? "desc" : "asc"
              const newUrl = new URL(window.location.href)
              newUrl.searchParams.set("order", newOrder)
              router.push(newUrl.toString())
            }}
            className="bg-white"
          >
            {order === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
            <span className="ml-2">Sort {order === "asc" ? "A-Z" : "Z-A"}</span>
          </Button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableCaption className="py-4 text-gray-600">
            Showing {categories.length} categories • Page {page} of {totalPages}
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-16 text-center font-semibold">#</TableHead>
              <TableHead className="font-semibold">Category Name</TableHead>
              <TableHead className="w-32 text-center font-semibold">Image</TableHead>
              <TableHead className="w-32 text-center font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-gray-500">No categories found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category, index) => (
                <TableRow key={category.id.toString()} className="hover:bg-gray-50">
                  <TableCell className="text-center font-medium text-gray-600">{(page - 1) * 10 + index + 1}</TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Image
                        unoptimized={true}
                        width={60}
                        height={60}
                        alt={category.name}
                        className="rounded-lg object-cover border border-gray-200"
                        src={category.imageUrl || "/placeholder.svg"}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDialog("edit", category.id.toString())}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <Pen size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDialog("delete", category.id.toString())}
                        className="border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePaging(page - 1)} />
                </PaginationItem>
              )}
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <Button
                    variant={i + 1 === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePaging(i + 1)}
                    className={i + 1 === page ? "bg-amber-600 hover:bg-amber-700" : ""}
                  >
                    {i + 1}
                  </Button>
                </PaginationItem>
              ))}
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => handlePaging(page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <CategoryActions
        isAddDialogOpen={isAddDialogOpen}
        editCategoryId={editCategoryId}
        deleteCategoryId={deleteCategoryId}
      />
    </div>
  )
}

export default AdminCategories

const CategoryActions = ({
  isAddDialogOpen,
  editCategoryId,
  deleteCategoryId,
}: {
  isAddDialogOpen: boolean
  editCategoryId: string | null
  deleteCategoryId: string | null
}) => {
  const router = useRouter()

  const closeDialog = (type: "add" | "edit" | "delete") => {
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.delete(type)
    router.replace(newUrl.toString(), { scroll: false })
  }

  return (
    <div>
      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={() => closeDialog("add")}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add New Category</DialogTitle>
          </DialogHeader>
          <AddCategoryForm onCategoryAdded={() => router.refresh()} />
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      {editCategoryId && (
        <Dialog open={true} onOpenChange={() => closeDialog("edit")}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Edit Category</DialogTitle>
            </DialogHeader>
            <EditCategoryForm categoryId={editCategoryId} onCategoryUpdated={() => router.refresh()} />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Category Dialog */}
      {deleteCategoryId && (
        <Dialog open={true} onOpenChange={() => closeDialog("delete")}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Delete Category</DialogTitle>
            </DialogHeader>
            <DeleteCategoryDialog
              categoryId={deleteCategoryId}
              onCategoryDeleted={() => router.refresh()}
              onClose={() => closeDialog("delete")}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
