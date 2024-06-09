import React from "react";
import Header from "../components/Header";

const About: React.FC = () => {
  return (
    <div>
      <div>
        <Header
          backgroundImage="/path-to-your-about-image.jpg"
          title="About Us"
        />
      </div>

      <section className="py-16 px-4 md:px-16 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="mb-4 text-lg leading-relaxed">
            Welcome to our jewelry store, where elegance meets craftsmanship.
            Founded with a passion for exquisite designs and a commitment to
            quality, our journey began over a decade ago.
          </p>
          <p className="text-lg leading-relaxed">
            Our mission is to provide exceptional jewelry pieces that not only
            adorn but also tell a story. From the initial design to the final
            product, we ensure each piece is crafted with precision and care.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-16 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Values & Vision</h2>
          <p className="mb-4 text-lg leading-relaxed">
            At our core, we value integrity, innovation, and excellence. Our
            vision is to lead the jewelry industry by setting new standards in
            design and customer satisfaction.
          </p>
          <p className="text-lg leading-relaxed">
            We believe in sustainability and ethical practices, ensuring that
            every piece of jewelry is created with the utmost respect for the
            environment and the communities we work with.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-16 bg-gray-100 text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-4 text-lg leading-relaxed">
            We'd love to hear from you! Whether you have a question, need
            assistance, or want to share your feedback, please feel free to
            contact us.
          </p>
          <p className="text-lg leading-relaxed">Email: info@yourstore.com</p>
          <p className="text-lg leading-relaxed">Phone: +123 456 7890</p>
        </div>
      </section>
    </div>
  );
};

export default About;
