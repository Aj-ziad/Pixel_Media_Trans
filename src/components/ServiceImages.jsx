'use client';
import { useState } from "react";

export default function ServiceImages({ mainImage, additionalImages = [] }) {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  const thumbnails = additionalImages.length > 0 ? additionalImages : [mainImage, mainImage, mainImage];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <img
        src={selectedImage}
        alt="Selected Service"
        className="w-full h-96 object-cover rounded-2xl shadow-lg transition-all duration-300"
      />

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-4">
        {thumbnails.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Preview ${idx + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`w-full h-32 object-cover rounded-xl cursor-pointer border-2 transition
              ${selectedImage === img ? "border-yellow-400" : "border-transparent"}`}
          />
        ))}
      </div>
    </div>
  );
}
