import { Coffee, MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-accent text-accent-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Coffee className="w-5 h-5 text-accent" />
              </div>
              <span className="font-bold text-xl">Amorcito Coffee</span>
            </div>
            <p className="text-accent-foreground/80 text-sm leading-relaxed mb-4">
              Siempre Hecho Con Amor. Warm drinks, fresh pastries, and friendly faces.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-accent-foreground/10 hover:bg-primary hover:text-accent flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-accent-foreground/10 hover:bg-primary hover:text-accent flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-bold text-lg mb-4">Location</h4>
            <div className="space-y-3 text-accent-foreground/80 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Huntington Park<br />Los Angeles, CA </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>hello@amorcitocoffee.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-lg mb-4">Hours</h4>
            <div className="space-y-2 text-accent-foreground/80 text-sm">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p>Mon - Sun: 8am - 12pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <a href="#about" className="block text-accent-foreground/80 hover:text-primary text-sm transition-colors">
                About Us
              </a>
              <a href="#menu" className="block text-accent-foreground/80 hover:text-primary text-sm transition-colors">
                Our Menu
              </a>
              <a href="#how-it-works" className="block text-accent-foreground/80 hover:text-primary text-sm transition-colors">
                How to Order
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-accent-foreground/10 text-center text-sm text-accent-foreground/60">
          <p>&copy; {new Date().getFullYear()} Amorcito Coffee. All rights reserved. Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
