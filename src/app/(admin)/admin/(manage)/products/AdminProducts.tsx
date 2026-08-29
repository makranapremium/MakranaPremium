"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, SortAsc, SortDesc, Trash2, Plus, Filter } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import type { CategoryType, ProductType } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddProductForm from "@/components/admin/add-product-form";
import EditProductForm from "@/components/admin/edit-product-form";
import DeleteProductDialog from "@/components/admin/delete-product-dialog";

interface AdminProductsParams {
  page: number | 1;
  totalPages: number | 1;
  selectedCategory: string | null;
  products: ProductType[];
  categories: CategoryType[];
}

const AdminProducts = ({
  selectedCategory,
  page,
  totalPages,
  products,
  categories,
}: AdminProductsParams) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAddDialogOpen = searchParams.get("add") === "true";
  const editProductId = searchParams.get("edit");
  const deleteProductId = searchParams.get("delete");
  const order = searchParams.get("order");

  const openDialog = (type: "add" | "edit" | "delete", id?: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(type, id || "true");
    router.replace(newUrl.toString(), { scroll: false });
  };

  const handlePaging = (newPage: number) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("page", newPage.toString());
    router.push(newUrl.toString());
  };

  const handleCategoryFilter = (value: string) => {
    const newUrl = new URL(window.location.href);
    if (value === "all") {
      newUrl.searchParams.delete("category");
    } else {
      newUrl.searchParams.set("category", value);
    }
    newUrl.searchParams.set("page", "1");
    router.push(newUrl.toString());
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Products Management
          </h1>
          <p className="text-gray-600">Manage your marble product catalog</p>
        </div>
        <Button
          onClick={() => openDialog("add")}
          className="bg-amber-600 hover:bg-amber-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters and Controls */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Category Filter */}
            <Select
              onValueChange={handleCategoryFilter}
              value={selectedCategory ?? "all"}
            >
              <SelectTrigger className="w-48 bg-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category: CategoryType) => (
                  <SelectItem
                    key={category.id.toString()}
                    value={category.id.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select
              onValueChange={(value) => {
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set("sort", value);
                router.push(newUrl.toString());
              }}
              value={searchParams.get("sort") ?? "date_added"}
            >
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date_added">Date Added</SelectItem>
                <SelectItem value="updated">Updated</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <Button
            variant="outline"
            onClick={() => {
              const newOrder =
                searchParams.get("order") === "asc" ? "desc" : "asc";
              const newUrl = new URL(window.location.href);
              newUrl.searchParams.set("order", newOrder);
              router.push(newUrl.toString());
            }}
            className="bg-white"
          >
            {order === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
            <span className="ml-2">
              {order === "asc" ? "Ascending" : "Descending"}
            </span>
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableCaption className="py-4 text-gray-600">
            Showing {products.length} products • Page {page} of {totalPages}
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-16 text-center font-semibold">
                #
              </TableHead>
              <TableHead className="font-semibold">Product Name</TableHead>
              <TableHead className="w-32 text-center font-semibold">
                Image
              </TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="w-32 text-center font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-gray-500">No products found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product: ProductType, index) => (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  <TableCell className="text-center font-medium text-gray-600">
                    {(page - 1) * 10 + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Image
                        unoptimized={true}
                        width={60}
                        height={60}
                        alt={product.name}
                        className="rounded-lg object-cover border border-gray-200"
                        src={product.imageUrl || "/placeholder.svg"}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      {product.categoryId.name}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDialog("edit", product.id)}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <Pen size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDialog("delete", product.id)}
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
                    className={
                      i + 1 === page ? "bg-amber-600 hover:bg-amber-700" : ""
                    }
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

      <ProductActions
        isAddDialogOpen={isAddDialogOpen}
        editProductId={editProductId}
        deleteProductId={deleteProductId}
      />
    </div>
  );
};

export default AdminProducts;

const ProductActions = ({
  isAddDialogOpen,
  editProductId,
  deleteProductId,
}: {
  isAddDialogOpen: boolean;
  editProductId: string | null;
  deleteProductId: string | null;
}) => {
  const router = useRouter();

  const closeDialog = (type: "add" | "edit" | "delete") => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete(type);
    router.replace(newUrl.toString(), { scroll: false });
  };

  return (
    <div>
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={() => closeDialog("add")}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Add New Product
            </DialogTitle>
          </DialogHeader>
          <AddProductForm onProductAdded={() => router.refresh()} />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      {editProductId && (
        <Dialog open={true} onOpenChange={() => closeDialog("edit")}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Edit Product
              </DialogTitle>
            </DialogHeader>
            <EditProductForm
              productId={editProductId}
              onProductUpdated={() => router.refresh()}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Product Dialog */}
      {deleteProductId && (
        <Dialog open={true} onOpenChange={() => closeDialog("delete")}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Delete Product
              </DialogTitle>
            </DialogHeader>
            <DeleteProductDialog
              productId={deleteProductId}
              onProductDeleted={() => router.refresh()}
              onClose={() => closeDialog("delete")}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
