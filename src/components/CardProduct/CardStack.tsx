import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  name: string;
  category: string;
  images: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  images,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="border border-gray-300 shadow-lg rounded overflow-hidden w-96 mx-auto"
    >
      <h2 className="text-xl font-semibold p-4">{name}</h2>
      <p className="text-gray-600 p-4">{category}</p>

      <div className="relative overflow-hidden">
        {images?.length > 0 ? (
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={name}
            className="w-full h-80 bg-cover bg-center bg-no-repeat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <p className="text-gray-500">Nenhuma imagem disponível</p>
          </div>
        )}
        {images?.length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              onClick={() => handleImageChange("prev")}
            >
              {"<"}
            </button>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              onClick={() => handleImageChange("next")}
            >
              {">"}
            </button>
          </>
        )}
      </div>

      <div className="flex p-4">
        {images?.map((url, index) => (
          <motion.img
            key={index}
            src={url}
            alt={name}
            className="w-12 h-12 rounded mr-2 cursor-pointer  transform transition-transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProductCard;
