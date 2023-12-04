import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { BsWhatsapp } from "react-icons/bs";

interface ProductCardProps {
  name: string;
  category: string;
  images: string[];
  requestInfos?: { quantidade: number, valorUnitario: number, unidade: string, observacao?: string }
  sendProductToWhatsApp?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  images,
  requestInfos,
  sendProductToWhatsApp,
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
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center shadow-lg shadow-theme-light.600 dark:shadow-black rounded-xl overflow-hidden w-96 mx-auto bg-theme-light.100 dark:bg-theme-dark.100 hover:shadow-xl"
    >
      <h2 className="text-xl font-semibold px-4 pt-4 w-full">{name}</h2>
      {
        requestInfos && (
          <div className="flex flex-col w-full pt-2 justify-start">
            <div className="flex flex-row">
              <h3 className="text-md font-bold pl-4">Quantidade:</h3>
              <h3 className="text-md pl-2">{requestInfos?.quantidade.toFixed(2) + " " + requestInfos?.unidade}</h3>
            </div>
            <div className="flex flex-row">
              <h3 className="text-md font-bold pl-4">Valor Unitário:</h3>
              <h3 className="text-md pl-2">{requestInfos?.valorUnitario.toFixed(2)}</h3>
            </div>
            <div className="flex flex-row">
              <h3 className="text-md font-bold pl-4">Total:</h3>
              <h3 className="text-md pl-2">{(requestInfos?.quantidade * requestInfos?.valorUnitario).toFixed(2)}</h3>
            </div>
          </div>
        )
      }
      <p className="text-gray-600 px-4 w-full">{category}</p>

      <div className="relative overflow-hidden w-full h-full p-2 rounded">
        {images?.length > 0 ? (
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={name}
            className="w-full h-80 bg-cover bg-center bg-no-repeat rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-80 bg-gray-200">
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

      <div className="flex justify-start gap-4 px-2 w-full">
        {images?.map((url, index) => (
          <motion.img
            key={index}
            src={url}
            alt={name}
            className="w-12 h-12 rounded-md mb-2 cursor-pointer transform transition-transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
      {sendProductToWhatsApp && (
        <div className="flex w-full">
          <Button onClick={sendProductToWhatsApp} className="flex gap-4 items-center justify-center m-2 rounded-xl hover:scale-95" >
            <BsWhatsapp className="w-6 h-6" />
            Solicitar pelo WhatsApp
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;
