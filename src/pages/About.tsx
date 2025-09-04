import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Shield, Award } from 'lucide-react';

const About=()=> {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize the security of your financial data above everything else.',
    },
    {
      icon: Users,
      title: 'Customer Focused',
      description: 'Every decision we make is centered around improving user experience.',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We continuously innovate to bring you the latest in fintech solutions.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service delivery.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      description: 'Former Goldman Sachs executive with 15+ years in fintech.',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      description: 'Ex-Google engineer specializing in secure payment systems.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Security',
      description: 'Cybersecurity expert with extensive experience in financial services.',
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      description: 'Product strategist focused on user experience and financial inclusion.',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">About WalletPay</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Revolutionizing Digital Payments
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded in 2020, WalletPay has emerged as a leading digital wallet platform, 
            empowering millions of users worldwide to manage their finances with confidence, 
            security, and convenience.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To democratize financial services by providing secure, accessible, and 
                innovative digital payment solutions that empower individuals and businesses 
                to participate fully in the digital economy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To create a world where financial transactions are seamless, secure, and 
                instantaneous, enabling economic growth and financial inclusion for all, 
                regardless of geographical or economic barriers.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-20 py-16 bg-muted/30 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2M+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$50B+</div>
              <div className="text-muted-foreground">Transactions Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.99%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the experienced professionals driving our mission forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


export default About