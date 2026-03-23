import Link from "next/link";
import { FiFacebook, FiYoutube, FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1e3a5f] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] flex items-center justify-center text-[#1e3a5f] font-bold text-lg">
                W
              </div>
              <div>
                <p className="font-bold text-sm">West Gilmore St</p>
                <p className="text-[#c9a84c] text-xs">Church of Christ</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5 italic">
              &quot;Pointing Souls to Christ Through Truth and Love&quot;
            </p>
            <div className="flex gap-3">
              {[
                { icon: FiFacebook, href: "#", label: "Facebook" },
                { icon: FiYoutube, href: "#", label: "YouTube" },
                { icon: FiInstagram, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a84c] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[#c9a84c] mb-4 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/sermons", label: "Sermons" },
                { href: "/events", label: "Events" },
                { href: "/gallery", label: "Gallery" },
                { href: "/resources", label: "Resources" },
                { href: "/donations", label: "Give Online" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-[#c9a84c] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="font-semibold text-[#c9a84c] mb-4 uppercase tracking-wider text-xs">Service Times</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <p className="text-white font-medium">Sunday Morning</p>
                <p>Bible Class: 9:30 AM</p>
                <p>Worship: 10:30 AM</p>
              </li>
              <li>
                <p className="text-white font-medium">Sunday Evening</p>
                <p>Worship: 5:00 PM</p>
              </li>
              <li>
                <p className="text-white font-medium">Wednesday</p>
                <p>Bible Study: 7:00 PM</p>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#c9a84c] mb-4 uppercase tracking-wider text-xs">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <FiMapPin className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <span>123 West Gilmore St<br />Your City, State 00000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <FiPhone className="text-[#c9a84c] flex-shrink-0" />
                <a href="tel:+10000000000" className="hover:text-[#c9a84c] transition-colors">(000) 000-0000</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <FiMail className="text-[#c9a84c] flex-shrink-0" />
                <a href="mailto:info@westgilmoreschurch.org" className="hover:text-[#c9a84c] transition-colors">info@westgilmoreschurch.org</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/50 text-xs">
            © {currentYear} West Gilmore St Church of Christ. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/50">
            <Link href="/contact" className="hover:text-[#c9a84c] transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-[#c9a84c] transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
