"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  FileText,
  Loader2,
  ArrowLeft,
  Save,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import BlogEditor from "@/components/blog/blog-editor";
import { createBlog, updateBlog, uploadToCloudinary } from "@/lib/api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type BlogCategory = "marble-slab" | "article";

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  featuredImage: string;
  publishedAt: string;
  content: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

interface BlogFormData {
  title: string;
  slug: string;
  category: BlogCategory;
  featuredImage: string;
  content: Record<string, unknown>;
}

const createEmptyForm = (): BlogFormData => ({
  title: "",
  slug: "",
  category: "marble-slab",
  featuredImage: "",
  content: {
    type: "doc",
    content: [],
  },
});

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const [formData, setFormData] = useState<BlogFormData>(createEmptyForm);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingFeaturedImage, setIsUploadingFeaturedImage] =
    useState(false);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  /**
   * ============================================================
   * LOAD BLOGS
   * ============================================================
   */

  const loadBlogs = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/blogs");

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();

      setBlogs(data.blogs ?? []);
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  /**
   * ============================================================
   * CREATE BLOG
   * ============================================================
   */
  const handleAddBlog = () => {
    setEditingBlogId(null);
    setFormData(createEmptyForm());
    setIsEditorOpen(true);
  };

  /**
   * ============================================================
   * EDIT BLOG
   * ============================================================
   */

  const handleEditBlog = (blog: Blog) => {
    setEditingBlogId(blog.id);

    setFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      featuredImage: blog.featuredImage,
      content: blog.content,
    });

    setIsEditorOpen(true);
  };

  /**
   * ============================================================
   * CANCEL
   * ============================================================
   */

  const handleCancel = () => {
    if (isSaving || isUploadingFeaturedImage) return;

    setIsEditorOpen(false);
    setEditingBlogId(null);
    setFormData(createEmptyForm());
  };

  /**
   * ============================================================
   * TITLE → SLUG
   * ============================================================
   */

  const handleTitleChange = (title: string) => {
    setFormData((previous) => ({
      ...previous,
      title,

      ...{
        slug: title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-"),
      },
    }));
  };

  /**
   * ============================================================
   * FEATURED IMAGE UPLOAD
   * ============================================================
   */

  const handleFeaturedImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    /*
     * Validate image type
     */
    if (!file.type.startsWith("image/")) {
      toast.warning("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    /*
     * 10MB maximum
     */
    if (file.size > 10 * 1024 * 1024) {
      toast.warning("Image size must be less than 10MB.");
      event.target.value = "";
      return;
    }

    setIsUploadingFeaturedImage(true);

    try {
      const imageUrl = await uploadToCloudinary(file);

      if (!imageUrl) {
        throw new Error("Failed to upload featured image.");
      }

      setFormData((previous) => ({
        ...previous,
        featuredImage: imageUrl,
      }));
    } catch (error) {
      console.error("Featured image upload error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to upload featured image. Please try again.",
      );
    } finally {
      setIsUploadingFeaturedImage(false);

      /*
       * Allows the user to select the same image again.
       */
      event.target.value = "";
    }
  };

  /**
   * ============================================================
   * REMOVE FEATURED IMAGE
   * ============================================================
   */

  const handleRemoveFeaturedImage = () => {
    if (isUploadingFeaturedImage) return;

    setFormData((previous) => ({
      ...previous,
      featuredImage: "",
    }));
  };

  /**
   * ============================================================
   * SAVE / UPDATE BLOG
   * ============================================================
   */

  /**
   * ============================================================
   * CREATE / UPDATE BLOG
   * ============================================================
   */

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.warning("Please enter a blog title.");
      return;
    }

    if (!formData.slug.trim()) {
      toast.warning("Please enter a blog slug.");
      return;
    }

    if (!formData.featuredImage) {
      toast.warning("Please upload a featured image.");
      return;
    }

    setIsSaving(true);

    try {
      const blogData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        category: formData.category,
        featuredImage: formData.featuredImage,
        content: formData.content,
      };

      /*
       * ============================================================
       * UPDATE EXISTING BLOG
       * ============================================================
       */

      if (editingBlogId) {
        const data = await updateBlog(editingBlogId, blogData);

        setBlogs((previousBlogs) =>
          previousBlogs.map((blog) =>
            blog.id === editingBlogId ? data.blog : blog,
          ),
        );

        toast.success("Blog post updated successfully.");
      } else {
        /*
         * ============================================================
         * CREATE NEW BLOG
         * ============================================================
         */
        const data = await createBlog(blogData);
        setBlogs((previousBlogs) => [data.blog, ...previousBlogs]);

        toast.success("Blog post created successfully.");
      }

      /*
       * ============================================================
       * CLOSE EDITOR
       * ============================================================
       */

      setIsEditorOpen(false);
      setEditingBlogId(null);
      setFormData(createEmptyForm());
    } catch (error) {
      console.error(
        editingBlogId ? "Failed to update blog:" : "Failed to create blog:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : editingBlogId
            ? "Something went wrong while updating the blog."
            : "Something went wrong while creating the blog.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * ============================================================
   * DELETE BLOG
   * ============================================================
   */

  const handleDelete = (blog: Blog) => {
    setBlogToDelete(blog);
  };

  const handleConfirmDelete = async () => {
    if (!blogToDelete) return;

    const blogId = blogToDelete.id;

    setDeletingBlogId(blogId);

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.message || data?.error || "Failed to delete blog",
        );
      }

      setBlogs((previousBlogs) =>
        previousBlogs.filter((blog) => blog.id !== blogId),
      );

      toast.success("Blog post deleted successfully.");

      setBlogToDelete(null);
    } catch (error) {
      console.error("Failed to delete blog:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to delete blog.",
      );
    } finally {
      setDeletingBlogId(null);
    }
  };

  /**
   * ============================================================
   * DATE FORMAT
   * ============================================================
   */

  const formatDate = (date: string | undefined) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /**
   * ============================================================
   * EDITOR VIEW
   * ============================================================
   */

  if (isEditorOpen) {
    return (
      <div className="mt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={isSaving || isUploadingFeaturedImage}
                className="mb-3 -ml-3 text-gray-500 hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
              </Button>

              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {editingBlogId ? "Edit Blog Post" : "Add Blog Post"}
              </h1>

              <p className="mt-2 text-gray-600">
                {editingBlogId
                  ? "Update your marble blog post."
                  : "Create a new marble slab guide or article."}
              </p>
            </div>
          </div>

          {/* Editor Form */}
          <Card className="border-0 bg-white shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label
                    htmlFor="blog-title"
                    className="text-sm font-medium text-gray-800"
                  >
                    Title
                  </label>

                  <Input
                    id="blog-title"
                    value={formData.title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    placeholder="Enter blog title"
                    className="h-12 border-gray-200 bg-gray-50"
                  />
                </div>

                {/* Slug + Category */}
                <div className="grid gap-5 md:grid-cols-2">
                  {/* Slug */}
                  <div className="space-y-2">
                    <label
                      htmlFor="blog-slug"
                      className="text-sm font-medium text-gray-800"
                    >
                      Slug
                    </label>

                    <Input
                      id="blog-slug"
                      value={formData.slug}
                      disabled
                      placeholder="your-blog-slug"
                      className="h-12 border-gray-200 bg-gray-50"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label
                      htmlFor="blog-category"
                      className="text-sm font-medium text-gray-800"
                    >
                      Category
                    </label>

                    <select
                      id="blog-category"
                      value={formData.category}
                      onChange={(event) =>
                        setFormData((previous) => ({
                          ...previous,
                          category: event.target.value as BlogCategory,
                        }))
                      }
                      className="h-12 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    >
                      <option value="marble-slab">Marble Slab</option>
                      <option value="article">Article</option>
                    </select>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* FEATURED IMAGE */}
                {/* ====================================================== */}

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-800">
                      Featured Image
                    </label>

                    <p className="mt-1 text-xs text-gray-400">
                      This image will be displayed as the main image for the
                      blog post.
                    </p>
                  </div>

                  {formData.featuredImage ? (
                    /*
                     * Image Preview
                     */
                    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                      <img
                        src={formData.featuredImage}
                        alt="Featured image preview"
                        className="aspect-[16/7] w-full object-cover"
                      />

                      <div className="absolute right-3 top-3">
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={handleRemoveFeaturedImage}
                          disabled={isUploadingFeaturedImage}
                          className="h-9 w-9 rounded-full shadow-lg"
                          title="Remove featured image"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /*
                     * Upload Area
                     */
                    <label
                      htmlFor="featured-image-upload"
                      className={`group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center transition-colors hover:border-amber-400 hover:bg-amber-50/50 ${
                        isUploadingFeaturedImage
                          ? "pointer-events-none opacity-70"
                          : ""
                      }`}
                    >
                      <input
                        id="featured-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFeaturedImageUpload}
                        disabled={isUploadingFeaturedImage}
                      />

                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
                        {isUploadingFeaturedImage ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          <Upload className="h-6 w-6" />
                        )}
                      </div>

                      <p className="font-medium text-gray-800">
                        {isUploadingFeaturedImage
                          ? "Uploading image..."
                          : "Upload featured image"}
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        PNG, JPG, WEBP up to 10MB
                      </p>
                    </label>
                  )}

                  {isUploadingFeaturedImage && (
                    <div className="flex items-center gap-2 text-sm text-amber-600">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading image to Cloudinary...
                    </div>
                  )}
                </div>

                {/* ====================================================== */}
                {/* TIPTAP */}
                {/* ====================================================== */}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">
                    Blog Content
                  </label>

                  <BlogEditor
                    value={formData.content}
                    onChange={(content: Record<string, unknown>) =>
                      setFormData((previous) => ({
                        ...previous,
                        content,
                      }))
                    }
                  />
                </div>

                {/* ====================================================== */}
                {/* ACTIONS */}
                {/* ====================================================== */}

                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving || isUploadingFeaturedImage}
                    className="sm:min-w-32"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving || isUploadingFeaturedImage}
                    className="bg-gray-950 text-white hover:bg-amber-600 sm:min-w-32"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {editingBlogId ? "Updating..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {editingBlogId ? "Update" : "Save"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  /**
   * ============================================================
   * BLOG LIST VIEW
   * ============================================================
   */

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Blog Management
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your marble slab guides and articles.
            </p>
          </div>

          <Button
            type="button"
            onClick={handleAddBlog}
            className="bg-gray-950 text-white hover:bg-amber-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Post
          </Button>
        </div>

        {/* Blog List */}
        <Card className="overflow-hidden border-0 bg-white shadow-xl">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="flex items-center gap-3 text-gray-500">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading blogs...
                </div>
              </div>
            ) : blogs.length === 0 ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
                  <FileText className="h-7 w-7 text-amber-600" />
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                  No blog posts yet
                </h2>

                <p className="mt-2 max-w-md text-sm text-gray-500">
                  Create your first marble slab guide or article to get started.
                </p>

                <Button
                  type="button"
                  onClick={handleAddBlog}
                  className="mt-6 bg-gray-950 text-white hover:bg-amber-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Post
                </Button>
              </div>
            ) : (
              <>
                {/* Desktop Header */}
                <div className="hidden border-b border-gray-200 bg-gray-50 px-6 py-4 md:grid md:grid-cols-[1fr_160px_140px_100px] md:items-center">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Title
                  </div>

                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Category
                  </div>

                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Updated
                  </div>

                  <div className="text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-gray-100">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="group px-5 py-5 transition-colors hover:bg-amber-50/40 sm:px-6"
                    >
                      {/* Desktop */}
                      <div className="hidden md:grid md:grid-cols-[1fr_160px_140px_100px] md:items-center">
                        <div className="min-w-0 pr-6">
                          <p className="truncate font-semibold text-gray-900">
                            {blog.title}
                          </p>

                          <p className="mt-1 truncate text-xs text-gray-400">
                            {blog.slug}
                          </p>
                        </div>

                        <div>
                          <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium capitalize text-amber-700">
                            {blog.category === "marble-slab"
                              ? "Marble Slab"
                              : "Article"}
                          </span>
                        </div>

                        <div className="text-sm text-gray-500">
                          {formatDate(blog.updatedAt || blog.publishedAt)}
                        </div>

                        <div className="flex justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditBlog(blog)}
                            className="text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={deletingBlogId === blog.id}
                            onClick={() => handleDelete(blog)}
                            className="text-gray-500 hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            {deletingBlogId === blog.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="flex items-start gap-4 md:hidden">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                          <FileText className="h-5 w-5 text-amber-600" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900">
                            {blog.title}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                              {blog.category === "marble-slab"
                                ? "Marble Slab"
                                : "Article"}
                            </span>

                            <span className="text-xs text-gray-400">
                              Updated{" "}
                              {formatDate(blog.updatedAt || blog.publishedAt)}
                            </span>
                          </div>
                        </div>

                        <div className="flex shrink-0 gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditBlog(blog)}
                            className="text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={deletingBlogId === blog.id}
                            onClick={() => handleDelete(blog)}
                            className="text-gray-500 hover:bg-red-50 hover:text-red-600"
                          >
                            {deletingBlogId === blog.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <AlertDialog
          open={Boolean(blogToDelete)}
          onOpenChange={(open) => {
            if (!open && !deletingBlogId) {
              setBlogToDelete(null);
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete blog post?</AlertDialogTitle>

              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-medium text-gray-900">
                  "{blogToDelete?.title}"
                </span>
                ? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={Boolean(deletingBlogId)}>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={(event) => {
                  event.preventDefault();
                  handleConfirmDelete();
                }}
                disabled={deletingBlogId === blogToDelete?.id}
                className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
              >
                {deletingBlogId === blogToDelete?.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Count */}
        {!isLoading && blogs.length > 0 && (
          <p className="mt-4 text-sm text-gray-400">
            {blogs.length} {blogs.length === 1 ? "post" : "posts"}
          </p>
        )}
      </div>
    </div>
  );
}
