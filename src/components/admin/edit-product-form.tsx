"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CategoryType } from "@/lib/types";
import {
  fetchCategories,
  fetchProduct,
  updateProduct,
  uploadToCloudinary,
} from "@/lib/api";
import mongoose from "mongoose";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

export default function EditProductForm({
  productId,
  onProductUpdated,
}: {
  productId: string;
  onProductUpdated: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    getCategories();
  }, []);

  async function getProduct() {
    try {
      const product = await fetchProduct(
        new mongoose.Types.ObjectId(productId),
      );

      setName(product.name);
      setCategory(product.categoryId);
      setDescription(product.description);
      setPreview(product.imageUrl);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    productId && getProduct();
  }, [productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !description)
      return alert("Please fill all fields");

    setLoading(true);
    try {
      let imageUrl = preview;
      if (image) {
        imageUrl = await uploadToCloudinary(image);
        if (!imageUrl) {
          alert("Image upload failed");
          setLoading(false);
          return;
        }
      }

      const productData = {
        name,
        description,
        categoryId: new mongoose.Types.ObjectId(category),
        imageUrl: imageUrl as string,
      };

      await updateProduct(new mongoose.Types.ObjectId(productId), productData);
      toast.success("Product updated");
      onProductUpdated();
      router.push("/admin/products");
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
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
        <SelectTrigger className="w-full">
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
      <Input
        id="productImage"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      {preview && (
        <Label htmlFor="productImage">
          <Image
            unoptimized={true}
            src={preview}
            alt="Preview"
            width={100}
            height={100}
            className="rounded-md mx-auto"
          />
        </Label>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
