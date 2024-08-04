import { BiX } from "react-icons/bi";
import { BsInstagram, BsTwitch, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" py-12">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between px-4">
        <div className="mb-8 lg:mb-0">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul>
            <li>
              <a
                href="#"
                className="  transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className=" transition-colors duration-300"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="#"
                className=" transition-colors duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-8 lg:mb-0">
          <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className=" transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="#"
              className=" transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram size={22} />
            </a>
            <a
              href="#"
              className="transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitterX size={22} />
            </a>
            <a
              href="#"
              className=" transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitch size={22} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="mb-2">
            Email:{" "}
            <a
              href="mailto:info@example.com"
              className=" hover:underline"
            >
              info@example.com
            </a>
          </p>
          <p className="mb-2">
            Phone:{" "}
            <a
              href="tel:+1234567890"
              className=" hover:underline"
            >
              +123 456 7890
            </a>
          </p>
          <p className=" mb-4">Address: 123 Street, Cityville</p>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="">
          &copy; {new Date().getFullYear()} Your E-Commerce Store. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
