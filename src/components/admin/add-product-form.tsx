"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { addProduct, fetchCategories, uploadToCloudinary } from "@/lib/api";
import { CategoryType } from "@/lib/types";
import { Textarea } from "../ui/textarea";

export default function AddProductForm({
  onProductAdded,
}: {
  onProductAdded: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  async function getCategories() {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !image || !description)
      return toast.error("Please fill in all fields!");
    setLoading(true);
    setIsUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(image);
      if (!imageUrl) {
        toast.error("Image upload failed. Please try again.");
        throw new Error("Image upload failed");
      }
      setIsUploading(false);

      const data = await addProduct({
        name,
        categoryId: category,
        imageUrl,
        description,
      });

      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (data) {
        toast.success("Product added successfully!");
        onProductAdded();
        router.push("/admin/products");
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      toast.error("Error adding product. Please try again.");
      console.error(error);
    }
    setIsUploading(false);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Product Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        required
      />
      <Textarea
        placeholder="Product Description"
        value={description}
        className=""
        maxLength={200}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
        required
      />

      {/* Category Selection */}
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id.toString()} value={cat.id.toString()}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-600 md:text-nowrap">
          Upload Image:
        </label>
        <Input type="file" onChange={handleImageChange} required />
      </div>

      {imagePreview && (
        <div className="flex justify-center">
          <Image
            unoptimized={true}
            src={imagePreview}
            alt="Preview"
            width={150}
            height={150}
            className="rounded-lg shadow-md"
          />
        </div>
      )}

      <Button
        type="submit"
        disabled={isUploading || loading}
        className="w-full"
      >
        {isUploading ? "Uploading..." : loading ? "Adding..." : "Add Product"}
      </Button>
    </form>
  );
}
