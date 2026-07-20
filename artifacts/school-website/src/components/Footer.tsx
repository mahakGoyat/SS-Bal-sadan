import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/school-logo.webp" alt="SS Bal Sadan School Logo" className="w-11 h-11 rounded-full object-cover border-2 border-white/20" loading="lazy" />
              <div>
                <p className="font-heading font-bold text-white leading-tight text-sm">SS Bal Sadan School</p>
                <p className="text-[#ffffff] text-xs">Siwan, Kaithal, Haryana</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Shaping Futures, Building Characters since 2003. A premier educational institution committed to holistic development and academic excellence.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ffffff] hover:text-[#111111] transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ffffff] hover:text-[#111111] transition-colors"
                data-testid="link-youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ffffff] hover:text-[#111111] transition-colors"
                data-testid="link-whatsapp"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-[#ffffff] mb-4 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ffffff] mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=V9Q7%2BFVQ+Siwan+Haryana+136027"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-footer-map"
                  className="text-white/70 text-sm hover:text-white hover:underline transition-colors"
                >
                  SS Bal Sadan School, Siwan, Kaithal, Haryana - 136027
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ffffff] flex-shrink-0" />
                <a href="tel:+919876543210" className="text-white/70 hover:text-[#ffffff] text-sm transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ffffff] flex-shrink-0" />
                <a href="mailto:info@ssbalsadan.edu.in" className="text-white/70 hover:text-[#ffffff] text-sm transition-colors">info@ssbalsadan.edu.in</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#ffffff] flex-shrink-0" />
                <span className="text-white/70 text-sm">Mon - Sat: 8:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-heading font-semibold text-[#ffffff] mb-4 text-sm uppercase tracking-widest">Location</h4>
            <div className="rounded-xl overflow-hidden border border-white/20">
              <a
                href="https://www.google.com/maps/search/?api=1&query=V9Q7%2BFVQ+Siwan+Haryana+136027"
                target="_blank"
                rel="noreferrer"
                className="block"
                title="Open in Google Maps"
              >
                <iframe
                  title="School Location"
                  src="https://maps.google.com/maps?q=V9Q7%2BFVQ%2C+Siwan%2C+Haryana+136027&output=embed"
                  width="100%"
                  height="160"
                  style={{ border: 0, pointerEvents: "none" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-sm text-center">
            &copy; {new Date().getFullYear()} SS Bal Sadan School, Siwan, Kaithal. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/documents" className="text-white/50 hover:text-[#ffffff] text-xs transition-colors">Privacy Policy</Link>
            <Link href="/documents" className="text-white/50 hover:text-[#ffffff] text-xs transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
