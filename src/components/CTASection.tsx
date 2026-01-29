import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-primary/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-pink-soft blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-8 animate-float shadow-pink">
            <Heart className="w-10 h-10 text-accent fill-accent/20" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-6">
            Ready for a Little Love in Every Sip?
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8">
            Or stop by for pickup—your perfect cup is waiting!
          </p>

          {/* CTA Button */}
          <Button variant="cta" size="xl" asChild>
            <a href="#menu">Order Online Now</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
