import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";

const About: React.FC = () => {
  return (
    <div>
      <div>
        <Header
          backgroundImage="/path-to-your-about-image.jpg"
          title="About Us"
        />
      </div>

      <Section
        title="Our Story"
        content="Welcome to our jewelry store, where elegance meets craftsmanship. Founded with a passion for exquisite designs and a commitment to quality, our journey began over a decade ago. Our mission is to provide exceptional jewelry pieces that not only adorn but also tell a story. From the initial design to the final product, we ensure each piece is crafted with precision and care."
        backgroundColor="#f3f4f6"
      />

      <Section
        title="Our Values & Vision"
        content="At our core, we value integrity, innovation, and excellence. Our vision is to lead the jewelry industry by setting new standards in design and customer satisfaction. We believe in sustainability and ethical practices, ensuring that every piece of jewelry is created with the utmost respect for the environment and the communities we work with."
        backgroundColor="#ffffff"
      />

      <Section
        title="Get in Touch"
        content="We'd love to hear from you! Whether you have a question, need assistance, or want to share your feedback, please feel free to contact us."
        backgroundColor="#f3f4f6"
        additionalContent={
          <div>
            <p className="text-lg leading-relaxed">Email: info@jewlerystore.com</p>
            <p className="text-lg leading-relaxed">Phone: +123 456 7890</p>
          </div>
        }
      />
    </div>
  );
};

export default About;
