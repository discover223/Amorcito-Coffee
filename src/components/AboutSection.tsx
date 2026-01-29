import { Heart, Coffee, Users, Sparkles } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every cup is handcrafted with care and attention.',
    },
    {
      icon: Coffee,
      title: 'Fresh Daily',
      description: 'Small-batch pastries baked fresh every morning.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'A place where neighbors meet and friends connect.',
    },
    {
      icon: Sparkles,
      title: 'Warm Welcome',
      description: 'Friendly faces and a smile with every order.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-brown-light uppercase tracking-wider mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-6">
            Where Every Cup Feels Like a Hug
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Amorito Coffee, every cup feels like a hug. We handcraft drinks, bake pastries in small batches, and serve every guest with a smile. We're a place where neighbors meet, friends catch up, and your day gets a little warmer.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/50 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-accent mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
