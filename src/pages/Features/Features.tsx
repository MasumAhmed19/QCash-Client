import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import {
  Send,
  Shield,
  Smartphone,
  CreditCard,
  Bell,
  Lock,
  Globe,
  Zap,
  Users,
  BarChart3,
  Headphones,
  ArrowRight,
} from 'lucide-react';

export function Features() {
  const coreFeatures = [
    {
      icon: Send,
      title: 'Instant Money Transfer',
      description: 'Send money to anyone, anywhere in seconds with our lightning-fast transfer system.',
      highlights: ['Real-time processing', 'Global reach', 'Low fees'],
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Your financial data is protected with military-grade encryption and advanced fraud detection.',
      highlights: ['256-bit encryption', 'Fraud monitoring', 'Secure authentication'],
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Experience',
      description: 'Optimized for mobile devices with an intuitive interface that works seamlessly across all platforms.',
      highlights: ['iOS & Android apps', 'Offline mode', 'Touch ID/Face ID'],
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Methods',
      description: 'Link multiple cards, bank accounts, and digital wallets for maximum payment flexibility.',
      highlights: ['Card linking', 'Bank transfers', 'Digital wallet integration'],
    },
  ];

  const advancedFeatures = [
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get instant alerts for all transactions, suspicious activities, and account updates.',
    },
    {
      icon: Lock,
      title: 'Two-Factor Authentication',
      description: 'Enhanced security with SMS, email, or app-based two-factor authentication.',
    },
    {
      icon: Globe,
      title: 'Multi-Currency Support',
      description: 'Support for 50+ currencies with real-time exchange rates and low conversion fees.',
    },
    {
      icon: Zap,
      title: 'Quick Actions',
      description: 'Frequently used actions accessible with just one tap from your home screen.',
    },
    {
      icon: Users,
      title: 'Split Bills',
      description: 'Easily split expenses with friends and family with our smart bill splitting feature.',
    },
    {
      icon: BarChart3,
      title: 'Spending Analytics',
      description: 'Track your spending patterns with detailed analytics and budgeting tools.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support available through chat, phone, and email.',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Powerful Features for Modern Banking
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover all the features that make WalletPay the preferred choice for millions 
            of users worldwide. From basic transfers to advanced analytics, we've got you covered.
          </p>
        </div>

        {/* Core Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-lg text-muted-foreground">
              Essential features that power your daily financial transactions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {feature.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Advanced Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
            <p className="text-lg text-muted-foreground">
              Additional features that enhance your financial management experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Security Highlight */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-3xl p-12">
            <div className="text-center mb-12">
              <Shield className="h-16 w-16 mx-auto text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">Security You Can Trust</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your security is our top priority. We employ multiple layers of protection 
                to keep your financial data safe.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  All data transmitted between your device and our servers is encrypted using AES-256.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Fraud Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced AI algorithms monitor transactions 24/7 to detect suspicious activities.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Regulatory Compliance</h3>
                <p className="text-sm text-muted-foreground">
                  Fully compliant with international financial regulations and security standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Experience These Features?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join millions of users who already enjoy these powerful features. 
                Get started with your free WalletPay account today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-base px-8" asChild>
                  <Link to="/register">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-base px-8" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}