import Hero from "../components/Hero";
import Section from "../components/Section";

const Home = () => (
  <>
    <Hero />
    <main className="flex flex-col items-center justify-start min-h-screen bg-gray-100 w-full">
      <Section
        title="Welcome to Our Jewelry Store"
        content="Explore our exclusive range of jewelry."
        link=""
        linkText=""
        backgroundColor="#fdfbfb"
      />
      <Section
        title="Shop All"
        content="Discover our full collection."
        link="/products"
        linkText="View Products"
        backgroundColor="##EFEFEF"
      />
      <Section
        title="About Us"
        content="Learn more about our story."
        link="/about"
        linkText="Read More"
        backgroundColor="#fdfbfb"
      />
      <Section
        title="New Arrivals"
        content="Check out our latest products."
        link="/products/new"
        linkText="See New Arrivals"
        backgroundColor="##EFEFEF"
      />
      <Section
        title="Contact Us"
        content="Get in touch with us for any inquiries."
        link="/contact"
        linkText="Contact Page"
        backgroundColor="#fdfbfb"
      />
      <Section
        title="Featured In"
        content=""
        link=""
        linkText=""
        backgroundColor="#EFEFEF"
        additionalContent={
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 p-4 mt-6 px-10">
            <img
              src="/images/plaza.webp"
              alt="Featured 1"
              className="w-150 h-35 object-cover"
            />
            <img
              src="/images/traveler.webp"
              alt="Featured 2"
              className="w-150 h-35 object-cover"
            />
            <img
              src="/images/elle.webp"
              alt="Featured 3"
              className="w-150 h-35 object-cover"
            />
            <img
              src="/images/vanity.avif"
              alt="Featured 4"
              className="w-150 h-35 object-cover"
            />
            <img
              src="/images/damernas.webp"
              alt="Featured 5"
              className="w-150 h-35 object-cover"
            />
            <img
              src="/images/vogue.webp"
              alt="Featured 6"
              className="w-150 h-35 object-cover"
            />
          </div>
        }
      />
    </main>
  </>
);

export default Home;
