import React from "react";
import { FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";
function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Fast and Free Delivery",
      description: "Enjoy quick and hassle-free shipping on all orders.",
      icon: <FaTruck className="text-5xl text-blue-500 mb-4" />,
    },
    {
      id: 2,
      title: "Easy Returns",
      description: "Return items within 30 days for a full refund.",
      icon: <FaUndo className="text-5xl text-green-500 mb-4" />,
    },
    {
      id: 3,
      title: "Secure Payments",
      description: "Safe and secure payment options.",
      icon: <FaShieldAlt className="text-5xl text-yellow-500 mb-4" />,
    },
  ];

  return (
    <section className="py-16 dark:bg-background bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center dark:text-gray-50 text-gray-800 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative border  border-[#4ade80] p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 dark:bg-neutral-800 text-center group"
            >
              <div className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-lg shadow-sm  opacity-90 group-hover:opacity-0 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold  mb-2 bg-primary-gradient text-transparent bg-clip-text">
                  {service.title}
                </h3>
                <p className=" dark:text-gray-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
