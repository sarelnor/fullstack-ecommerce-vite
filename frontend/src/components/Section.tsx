import React from "react";
import { Link } from "react-router-dom";
import { SectionProps } from "../types/types";

const Section: React.FC<SectionProps> = ({
  title,
  content,
  link,
  linkText,
  backgroundColor,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        backgroundColor: backgroundColor || "#fff",
        minHeight: "66vh",
      }}
    >
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <p className="text-lg mb-4">{content}</p>
      {link && (
        <Link to={link} className="mt-4 text-blue-500 hover:underline">
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default Section;
