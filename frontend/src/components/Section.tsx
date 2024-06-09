import React from "react";
import { Link } from "react-router-dom";
import { SectionProps } from "../types/types";

interface ExtendedSectionProps extends SectionProps {
  additionalContent?: React.ReactNode;
}

const Section: React.FC<ExtendedSectionProps> = ({
  title,
  content,
  link,
  linkText,
  backgroundColor,
  additionalContent,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full text-center"
      style={{
        backgroundColor: backgroundColor || "#fff",
        minHeight: "66vh",
      }}
    >
      <h2 className="text-5xl mb-8 px-8">{title}</h2>
      <p className="text-lg mb-4 px-4">{content}</p>
      {link && (
        <Link to={link} className="mt-4 text-blue-500 hover:underline">
          {linkText}
        </Link>
      )}
      {additionalContent && (
        <div className="w-full flex justify-center">
          {additionalContent}
        </div>
      )}
    </div>
  );
};

export default Section;
