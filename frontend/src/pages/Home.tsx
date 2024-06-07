import Hero from '../components/Hero';
import Section from '../components/Section';

const Home = () => (
  <>
    <Hero />
    <main className="flex flex-col items-center justify-start min-h-screen px-4 bg-gray-100 w-full">
      <div className="w-full flex flex-col items-center justify-center mt-16 mb-8 min-h-[40vh]">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Welcome to Our Jewelry Store</h1>
        <div className="text-lg mb-8 text-center">
          <p>Explore our exclusive range of jewelry.</p>
        </div>
      </div>
      <Section
        title="Shop All"
        content="Discover our full collection."
        link="/products"
        linkText="View Products"
        backgroundColor="#e9ecef"
      />
      <Section
        title="About Us"
        content="Learn more about our story."
        link="/about"
        linkText="Read More"
        backgroundColor="#f8f9fa"
      />
      <Section
        title="New Arrivals"
        content="Check out our latest products."
        link="/products/new"
        linkText="See New Arrivals"
        backgroundColor="#e9ecef"
      />
      <Section
        title="Contact Us"
        content="Get in touch with us for any inquiries."
        link="/contact"
        linkText="Contact Page"
        backgroundColor="#f8f9fa"
      />
    </main>
  </>
);

export default Home;
