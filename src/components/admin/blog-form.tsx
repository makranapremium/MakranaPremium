"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImageIcon, Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadToCloudinary, createBlog, updateBlog } from "@/lib/api";
import BlogEditor from "../blog/blog-editor";

type BlogCategory = "marble-slab" | "article";

interface BlogFormProps {
  mode: "create" | "edit";
  blogId?: string;
  initialData?: {
    title: string;
    slug: string;
    category: BlogCategory;
    featuredImage: string;
    publishedAt?: string;
    content: Record<string, unknown>;
  };
}

const emptyContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

export default function BlogForm({ mode, blogId, initialData }: BlogFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState<BlogCategory>(
    initialData?.category || "marble-slab",
  );
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || "",
  );
  const [content, setContent] = useState<Record<string, unknown>>(
    initialData?.content || emptyContent,
  );

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /*
   * Automatically generate slug while creating a blog.
   *
   * During editing we don't want the slug changing every time
   * the title changes.
   */
  useEffect(() => {
    if (mode !== "create") {
      return;
    }

    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setSlug(generatedSlug);
  }, [title, mode]);

  const handleFeaturedImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10MB.");
      event.target.value = "";
      return;
    }

    setIsUploadingImage(true);

    try {
      const imageUrl = await uploadToCloudinary(file);

      if (!imageUrl) {
        throw new Error("Image upload failed.");
      }

      setFeaturedImage(imageUrl);
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Failed to upload image.");
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!slug.trim()) {
      alert("Please enter a slug.");
      return;
    }

    if (!featuredImage) {
      alert("Please upload a featured image.");
      return;
    }


    setIsSaving(true);

    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        category,
        featuredImage,
        content,
      };

      if (mode === "create") {
        await createBlog(payload);
      } else {
        if (!blogId) {
          throw new Error("Blog ID is missing.");
        }

        await updateBlog(blogId, payload);
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving the blog.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.push("/admin/blogs")}
              className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </button>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {mode === "create" ? "Create New Blog" : "Edit Blog"}
            </h1>

            <p className="mt-2 text-gray-500">
              {mode === "create"
                ? "Create and publish a new blog post."
                : "Update your blog post and save the changes."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Blog Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Blog Details
            </h2>

            <div className="mt-6 space-y-6">
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
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="10 Best Makrana Marble Designs for Your Home"
                  className="h-12"
                  required
                />
              </div>

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
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  placeholder="10-best-makrana-marble-designs"
                  className="h-12"
                  required
                />

                <p className="text-xs text-gray-400">
                  Your blog will be available at /blog/{slug || "..."}
                </p>
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
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as BlogCategory)
                  }
                  className="h-12 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  required
                >
                  <option value="marble-slab">Marble Slab</option>
                  <option value="article">Article</option>
                </select>
              </div>


              {/* Featured Image */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-800">
                  Featured Image
                </label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {featuredImage && (
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      <img
                        src={featuredImage}
                        alt="Featured image preview"
                        className="h-40 w-64 object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <input
                      id="featured-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFeaturedImageUpload}
                      disabled={isUploadingImage}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      disabled={isUploadingImage}
                      onClick={() =>
                        document.getElementById("featured-image")?.click()
                      }
                    >
                      {isUploadingImage ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          {featuredImage ? "Change Image" : "Upload Image"}
                        </>
                      )}
                    </Button>

                    <p className="mt-2 text-xs text-gray-400">
                      JPG, PNG or WebP. Maximum 10MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Blog Content
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Write and format your complete article below.
              </p>
            </div>

            <BlogEditor
              value={content}
              onChange={(value) => setContent(value)}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              onClick={() => router.push("/admin/blogs")}
              className="h-12 px-6"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSaving || isUploadingImage}
              className="h-12 bg-gray-950 px-8 hover:bg-amber-600"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "create" ? "Saving..." : "Updating..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {mode === "create" ? "Save Blog" : "Update Blog"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
