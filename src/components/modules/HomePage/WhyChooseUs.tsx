import BaseSection from '@/components/layout/BaseSection';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Send, Shield, Smartphone } from 'lucide-react';

const WhyChooseUs = () => {
    const features = [
    {
      icon: Send,
      title: 'Instant Transfers',
      description: 'Send money instantly to friends, family, or businesses with just a few taps.',
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your transactions are protected with advanced encryption and security measures.',
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Access your wallet anytime, anywhere with our mobile-optimized platform.',
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Methods',
      description: 'Link cards, bank accounts, and other payment methods for maximum flexibility.',
    },
  ];
  return (
    <BaseSection>
        <section className="py-40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose WalletPay?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built the most secure, user-friendly, and feature-rich digital wallet 
              to meet all your financial needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </BaseSection>
  )
}

export default WhyChooseUs