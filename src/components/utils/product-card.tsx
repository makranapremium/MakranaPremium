"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Eye, X } from "lucide-react";

export default function ProductCard({
  product,
  listView = false,
}: {
  product: ProductType;
  listView?: boolean;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (listView) {
    return (
      <>
        <Card
          className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white p-0"
          onClick={() => setSelectedImage(product.imageUrl)}
        >
          <div className="flex">
            <div className="relative w-48 flex-shrink-0 flex-1/3">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex-2/3 p-6 flex flex-col justify-center">
              <h3 className="sm:text-xl font-bold text-gray-900 mb-2 capitalize">
                {product.name}
              </h3>
              <p className="text-amber-600 capitalize font-medium">
                {product.categoryId.name}
              </p>
            </div>
          </div>
        </Card>

        {selectedImage && (
          <ImageModal
            src={selectedImage || "/placeholder.svg"}
            alt={product.name}
            description={product.description}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Card
        className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white p-0 relative"
        onClick={() => setSelectedImage(product.imageUrl)}
      >
        {/* Full Background Image */}
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Hover Action */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
              onClick={() => setSelectedImage(product.imageUrl)}
            >
              <Eye className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Text Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-lg text-white mb-1 capitalize line-clamp-2 group-hover:text-amber-300 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-amber-300 capitalize font-medium">
              {product.categoryId.name}
            </p>
          </div>
        </div>
      </Card>

      {selectedImage && (
        <ImageModal
          src={selectedImage || "/placeholder.svg"}
          alt={product.name}
          description={product.description}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function ImageModal({
  src,
  alt,
  description,
  onClose,
}: {
  src: string;
  alt: string;
  description: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </button>

        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={4}
          doubleClick={{ mode: "toggle" }}
          pinch={{ step: 5 }}
          panning={{ velocityDisabled: true }}
          wheel={{
            disabled: false,
            wheelDisabled: true, // prevents normal wheel zoom
            touchPadDisabled: true,
            activationKeys: ["Control"], // 🔥 CTRL + scroll
          }}
        >
          <TransformComponent>
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={1200}
              height={1200}
              className="max-h-[90vh] w-auto object-contain select-none"
              draggable={false}
            />
          </TransformComponent>
        </TransformWrapper>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="text-white text-xl font-bold capitalize">{alt}</h3>
          <p className="text-white/40 text-sm font-bold capitalize max-w-xs text-wrap">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
