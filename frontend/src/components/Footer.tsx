import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const sections = [
  {
    title: "Our products",
    items: [
      "All products",
      "New products",
      "Rings",
      "Earrings",
      "Bracelets",
      "Necklaces",
    ],
  },
  {
    title: "Customer Service",
    items: [
      "Contact us",
      "Care guide",
      "Shipping & Delivery",
      "Returns & Exchange",
      "Refund policy",
    ],
  },
  {
    title: "Company",
    items: ["About us", "Blog", "Jobs", "Press", "Stores"],
  },
  {
    title: "Legal",
    items: ["Claims", "Privacy", "Terms and Conditions", "Policies", "FAQ"],
  },
];

const items = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Twitch", icon: FaPinterest, link: "https://pinterest.com/" },
];

const Footer = () => {
  return (
    <div className="w-full bg-zinc-800 text-zinc-300 py-5 px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 custom:grid-cols-6 border-b-2 border-zinc-600 p-8">
        {sections.map((section, index) => (
          <div key={index} className="px-4 pb-4">
            <h6 className="font-bold uppercase pt-2 mb-2">{section.title}</h6>
            <ul>
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="py-1 text-zinc-500 hover:text-white cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 pt-8 md:pt-1.5">
          <p className="font-bold uppercase">Subscribe to our newsletter</p>
          <p className="py-4">
            Get 15% off regular prices, the latest news and early bird sales.
          </p>
          <form className="flex flex-col sm:flex-row">
            <input
              className="w-full p-2 mr-4 rounded-md mb-4 text-zinc-900"
              type="email"
              id="email" 
              name="email"
              placeholder="Enter email.."
              autoComplete="email"
            />
            <button className="p-2 mb-4 bg-zinc-600 hover:bg-zinc-700 text-white rounded cursor-pointer">
              Subscribe
            </button>
          </form>
          <p className="py-2 text-sm">
            By registering, you agree to receive email marketing and our privacy
            policy.
          </p>
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-zinc-500">
        <p className="py-4">2024 JewelryStore. All rights reserved</p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          {items.map((x, index) => (
            <a
              key={index}
              href={x.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <x.icon className="text-zinc-500 hover:text-white cursor-pointer" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
