import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

const ContactUs = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMsg("");

    emailjs
      .sendForm(
        "service_gmde58s",
        "template_3vuktkz",
        formRef.current,
        "8toko7QrvhFcuPhJA"
      )
      .then(
        (result) => {
          setIsSending(false);
          setSuccessMsg("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          setIsSending(false);
          setSuccessMsg(" Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="bg-gradient-to-r  from-[#f6cece] to-[#e4efff]   min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-12">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Contact Form */}
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="user_name"
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="user_email"
                type="email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                name="subject"
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="5"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your message..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>

            {successMsg && (
              <p className="text-sm mt-2 font-medium text-green-600">{successMsg}</p>
            )}
          </form>

          {/* Right: Contact Info */}
          <div className="space-y-6 text-gray-700">
            <div className="flex items-start gap-4">
              <FiMapPin className="text-blue-600 text-2xl mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p>TechDev Office, Mirpur 1, Dhaka 1209, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiPhone className="text-blue-600 text-2xl mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-blue-600">+880 1747 430 447</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiMail className="text-blue-600 text-2xl mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-blue-600">adnanrony19@gmail.com</p>
              </div>
            </div>

            {/* Optional: Embedded Google Map */}
            <iframe
              className="w-full h-48 rounded-lg mt-6"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024722530663!2d90.36542097593689!3d23.750899578687053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c13b46b224db%3A0xeedfa7d8c2a6113b!2sMirpur%201%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              allowFullScreen
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
