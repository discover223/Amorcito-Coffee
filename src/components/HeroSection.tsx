import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-coffee.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Cafe - Fresh coffee and pastries"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in-up">
            <Heart className="w-4 h-4 text-accent fill-primary" />
            <span className="text-sm font-medium text-accent">Made with love</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-accent leading-tight mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Cafe
            <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold text-brown-light mt-2">
              Fresh Coffee & Pastries, Crafted with Love
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Warm drinks, fresh pastries, and friendly faces—crafted with love for our community every day.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#menu">Order Pickup Now</a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
