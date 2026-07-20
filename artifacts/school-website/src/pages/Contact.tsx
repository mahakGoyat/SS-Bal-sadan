import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { API_BASE } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us — SS Bal Sadan School Siwan, Kaithal";
  }, []);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let json: { ok: boolean; error?: string } | null = null;
      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        json = await res.json() as { ok: boolean; error?: string };
      }
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? "Failed to send message. Please try again.");
      }
      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="pt-16 lg:pt-20">
      <div className="bg-[#111111] py-12 sm:py-16 lg:py-20 text-white text-center">
        <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-2">Get In Touch</p>
        <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl">Contact Us</h1>
      </div>

      {/* Contact Cards */}
      <section className="py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: MapPin, label: "Our Address", value: "SS Bal Sadan School, Siwan, Kaithal, Haryana — 136027", color: "text-[#111111]" },
              { icon: Phone, label: "Phone Numbers", value: "+91 98765 43210\n+91 91234 56789", color: "text-green-600" },
              { icon: Mail, label: "Email Address", value: "info@ssbalsadan.edu.in\nprincipal@ssbalsadan.edu.in", color: "text-blue-600" },
              { icon: Clock, label: "Office Hours", value: "Mon – Sat\n8:00 AM – 2:00 PM", color: "text-[#111111]" },
            ].map(({ icon: Icon, label, value, color }) => (
              <motion.div key={label} variants={fadeUp} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <p className="font-heading font-semibold text-[#111111] text-sm mb-2">{label}</p>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading font-bold text-2xl text-[#111111] mb-6">Find Us on the Map</h2>
              <a
                href="https://www.google.com/maps/search/?api=1&query=V9Q7%2BFVQ+Siwan+Haryana+136027"
                target="_blank"
                rel="noreferrer"
                data-testid="link-open-google-maps"
                className="relative block rounded-2xl overflow-hidden shadow-md border border-gray-100 h-96 group"
                title="Open in Google Maps"
              >
                <iframe
                  title="SS Bal Sadan School Location"
                  src="https://maps.google.com/maps?q=V9Q7%2BFVQ%2C+Siwan%2C+Haryana+136027&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: "none" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-end justify-center pb-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#111111] text-sm font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Open in Google Maps
                  </span>
                </div>
              </a>

              {/* Social Links — below map */}
              <div className="mt-8 p-6 bg-[#111111] rounded-2xl text-white">
                <p className="font-heading font-semibold mb-4 text-sm">Connect on Social Media</p>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, label: "Facebook", href: "https://facebook.com", bg: "bg-[#1877f2]" },
                    { icon: Youtube, label: "YouTube", href: "https://youtube.com", bg: "bg-[#ff0000]" },
                    { icon: Instagram, label: "Instagram", href: "https://instagram.com", bg: "bg-gradient-to-br from-[#f09433] to-[#c13584]" },
                  ].map(({ icon: Icon, label, href, bg }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" data-testid={`link-social-${label.toLowerCase()}`} className={`${bg} w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md`} title={label}>
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading font-bold text-2xl text-[#111111] mb-6">Send Us a Message</h2>

              {status === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-3xl p-10 flex flex-col items-center text-center gap-4">
                  <CheckCircle className="w-14 h-14 text-green-500" />
                  <h3 className="font-heading font-bold text-xl text-[#111111]">Message Sent!</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Thank you for reaching out. We have received your message and will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 px-6 py-2.5 bg-[#111111] text-white text-sm rounded-full font-semibold hover:bg-black transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5 bg-[#f5f5f5] rounded-3xl p-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#111111] mb-2">Full Name *</label>
                      <input
                        name="name"
                        type="text"
                        data-testid="input-contact-name"
                        placeholder="Your full name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#111111] transition"
                        required
                        disabled={status === "sending"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#111111] mb-2">Mobile Number *</label>
                      <input
                        name="phone"
                        type="tel"
                        data-testid="input-contact-phone"
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#111111] transition"
                        required
                        disabled={status === "sending"}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      data-testid="input-contact-email"
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#111111] transition"
                      required
                      disabled={status === "sending"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Subject *</label>
                    <select
                      name="subject"
                      data-testid="input-contact-subject"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#111111] transition"
                      required
                      disabled={status === "sending"}
                      defaultValue=""
                    >
                      <option value="" disabled>Select a subject</option>
                      <option>Admission Enquiry</option>
                      <option>Fee Related</option>
                      <option>Academic Query</option>
                      <option>General Information</option>
                      <option>Complaint</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Your Message *</label>
                    <textarea
                      name="message"
                      data-testid="input-contact-message"
                      rows={5}
                      placeholder="Write your message here..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#111111] resize-none transition"
                      required
                      disabled={status === "sending"}
                    ></textarea>
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-red-700">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    data-testid="button-contact-send"
                    disabled={status === "sending"}
                    className="w-full py-4 bg-[#111111] text-white rounded-full font-semibold hover:bg-[#000000] transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
