import React from "react";
import { MdClose } from "react-icons/md";
import { SimpleModalProps } from "../types/types";

const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  imageUrl,
  alt,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative bg-white p-4 rounded-lg max-w-6xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black focus:outline-none"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
            margin: 0,
            width: "24px",
            height: "24px",
          }}
        >
          <MdClose size={24} />
        </button>
        <div className="relative w-full h-[80vh]">
          <img
            src={imageUrl}
            alt={alt}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleModal;
