import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  viewport,
} from "../utils/animations";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RESUME_URL = `${import.meta.env.BASE_URL}cahndancv.pdf`;

const contactInfo = [
  { icon: "📧", label: "Email", value: "chandanraj@email.com" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/chandanraj" },
  { icon: "🐙", label: "GitHub", value: "github.com/chandanraj" },
  { icon: "📍", label: "Location", value: "India" },
];

export default function Contact({ theme }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'
  const [deliveryMethod, setDeliveryMethod] = useState("emailjs");
  const isDark = theme === "dark";

  const openMailto = () => {
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    );
    window.location.href = `mailto:chandanraj@email.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setDeliveryMethod("mailto");
      openMailto();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          user_name: form.name,
          user_email: form.email,
        },
        {
          publicKey: PUBLIC_KEY,
        },
      );
      setDeliveryMethod("emailjs");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setDeliveryMethod("mailto");
      openMailto();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section
      id="contact"
      className={`py-24 ${isDark ? "bg-gray-950" : "bg-white"}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-purple-500 to-violet-500 mx-auto rounded-full mb-4" />
          <p
            className={`max-w-lg mx-auto leading-relaxed ${isDark ? "text-gray-500" : "text-gray-600"}`}
          >
            I'm actively looking for placement opportunities. If you have a
            role, a question, or just want to say hi — my inbox is always open!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h3
              className={`text-xl font-semibold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Contact Info
            </h3>
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="space-y-4 mb-8"
            >
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className={`flex items-center gap-4 border rounded-2xl p-4 hover:border-purple-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-900/15 transition-all duration-300 ${isDark ? "bg-gray-800/60 border-gray-700/80" : "bg-gray-100 border-gray-200"}`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-purple-400 text-xs font-semibold uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p
                      className={`text-sm mt-0.5 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <p
              className={`text-sm leading-relaxed mb-6 ${isDark ? "text-gray-500" : "text-gray-600"}`}
            >
              I typically respond within 24 hours. Feel free to reach out for
              internship opportunities, collaborations, or any questions about
              my work.
            </p>

            <a
              href={RESUME_URL}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40 transition-all duration-300 text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Resume
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {status === "success" ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center">
                <span className="text-5xl mb-4 block">✅</span>
                <h3
                  className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Message Sent!
                </h3>
                {deliveryMethod === "emailjs" ? (
                  <p
                    className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-700"}`}
                  >
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                ) : (
                  <p
                    className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-700"}`}
                  >
                    Your email app was opened with your message pre-filled.
                  </p>
                )}
                <button
                  onClick={() => setStatus("idle")}
                  className="text-purple-400 hover:text-purple-300 text-sm underline underline-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm mb-2 font-medium ${isDark ? "text-gray-400" : "text-gray-700"}`}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm ${isDark ? "bg-gray-800/60 border-gray-700 text-white placeholder-gray-600" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm mb-2 font-medium ${isDark ? "text-gray-400" : "text-gray-700"}`}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm ${isDark ? "bg-gray-800/60 border-gray-700 text-white placeholder-gray-600" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm mb-2 font-medium ${isDark ? "text-gray-400" : "text-gray-700"}`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm resize-none ${isDark ? "bg-gray-800/60 border-gray-700 text-white placeholder-gray-600" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40 transition-all duration-300 text-sm tracking-wide inline-flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
