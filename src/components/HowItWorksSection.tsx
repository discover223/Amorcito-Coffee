import { MousePointer, Clock, MessageSquare, CreditCard, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: MousePointer,
      step: 1,
      title: 'Select Items',
      description: 'Browse our menu and add your favorite drinks & pastries to your cart.',
    },
    {
      icon: Clock,
      step: 2,
      title: 'Choose Pickup Time',
      description: 'Select a convenient pickup time that works for you.',
    },
    {
      icon: MessageSquare,
      step: 3,
      title: 'Add Notes',
      description: 'Add special requests like extra hot, dairy-free, or any preferences.',
    },
    {
      icon: CreditCard,
      step: 4,
      title: 'Pay Online',
      description: 'Complete your payment securely online or pay at pickup.',
    },
    {
      icon: CheckCircle,
      step: 5,
      title: 'Pick Up & Enjoy',
      description: 'Receive confirmation and pick up your order at the scheduled time.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gradient-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-brown-light uppercase tracking-wider mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-6">
            Order Online in 5 Easy Steps
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Skip the line and have your order ready when you arrive. It's fast, easy, and made with love.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.step}
                  className="relative flex items-start gap-6 group"
                >
                  {/* Step Number & Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-card shadow-soft group-hover:shadow-medium transition-all duration-300 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary">
                      <step.icon className="w-7 h-7 text-accent" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-accent text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold text-accent mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
