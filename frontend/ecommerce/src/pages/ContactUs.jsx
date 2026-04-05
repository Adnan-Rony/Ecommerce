import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { FiMapPin, FiMail, FiPhone, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

// ── Contact info items ────────────────────────────────────────────────────
const INFO = [
  {
    icon: <FiMapPin size={18} />,
    label: "Our Office",
    value: "Mirpur 1, Dhaka 1209, Bangladesh",
    href: "https://maps.google.com/?q=Mirpur+1+Dhaka",
  },
  {
    icon: <FiPhone size={18} />,
    label: "Call Us",
    value: "+880 1747 430 447",
    href: "tel:+8801747430447",
  },
  {
    icon: <FiMail size={18} />,
    label: "Email Us",
    value: "adnanrony19@gmail.com",
    href: "mailto:adnanrony19@gmail.com",
  },
];

// ── Field component ───────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d4c9e]/30 focus:border-[#1d4c9e] transition";

// ── Main Component ────────────────────────────────────────────────────────
const ContactUs = () => {
  const formRef   = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_gmde58s",
        "template_3vuktkz",
        formRef.current,
        "8toko7QrvhFcuPhJA"
      )
      .then(() => {
        setStatus("success");
        formRef.current.reset();
        setTimeout(() => setStatus("idle"), 5000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto mb-6">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link to="/" className="hover:text-[#1d4c9e] transition">Home</Link>
          <span>/</span>
          <span className="text-gray-600">Contact Us</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 rounded-3xl overflow-hidden shadow-xl border border-gray-100">

          {/* ── LEFT PANEL — dark branded ─────────────────────────────── */}
          <div className="lg:col-span-2 bg-[#0f2d6b] relative overflow-hidden flex flex-col justify-between p-8 md:p-10">

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#1d4c9e]/40 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10">
              {/* Brand */}
              <div className="mb-8">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                  ZapZoneBD
                </p>
                <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight">
                  Get in touch<br />with us
                </h2>
                <p className="text-white/60 text-sm mt-3 leading-relaxed">
                  Have a question about an order, product, or need support? We're here 7 days a week.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-5">
                {INFO.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.label === "Our Office" ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-white flex-shrink-0 transition">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/50 text-[11px] uppercase tracking-widest font-semibold">
                        {item.label}
                      </p>
                      <p className="text-white text-sm mt-0.5 group-hover:text-yellow-300 transition">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map embed */}
            <div className="relative z-10 mt-8 rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024722530663!2d90.36542097593689!3d23.750899578687053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c13b46b224db%3A0xeedfa7d8c2a6113b!2sMirpur%201%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                className="w-full h-40"
                allowFullScreen
                loading="lazy"
                title="Office Location"
              />
            </div>
          </div>

          {/* ── RIGHT PANEL — form ───────────────────────────────────── */}
          <div className="lg:col-span-3 bg-white p-8 md:p-10">
            <div className="mb-7">
              <h3 className="text-xl font-bold text-gray-900">Send us a message</h3>
              <p className="text-sm text-gray-400 mt-1">
                We'll get back to you within 24 hours.
              </p>
            </div>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Your Name">
                  <input
                    name="user_name"
                    type="text"
                    required
                    placeholder="e.g. Adnan Rony"
                    className={inputClass}
                  />
                </Field>
                <Field label="Email Address">
                  <input
                    name="user_email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Subject">
                <input
                  name="subject"
                  type="text"
                  placeholder="e.g. Order issue, product question..."
                  className={inputClass}
                />
              </Field>

              <Field label="Message">
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us how we can help you..."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
                  <FiCheckCircle size={16} className="flex-shrink-0" />
                  Message sent! We'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                  <FiAlertCircle size={16} className="flex-shrink-0" />
                  Failed to send. Please try again or email us directly.
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#1d4c9e] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="text-xs text-gray-400 text-center mt-6">
              You can also reach us on{" "}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#1d4c9e] hover:underline"
              >
                Facebook
              </a>{" "}
              — we reply to messages there too.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;