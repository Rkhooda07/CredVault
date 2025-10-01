import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, Award, ExternalLink, CheckCircle, Lock, Globe, User, Building, Search } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-credentials.jpg";

export default function Landing() {
  const features = [
    {
      icon: Lock,
      title: "Blockchain Security",
      description: "Immutable credential storage on Polygon network with cryptographic verification."
    },
    {
      icon: Globe,
      title: "Global Verification",
      description: "Instant verification anywhere in the world with QR code scanning."
    },
    {
      icon: Award,
      title: "Institution Trust",
      description: "Verified issuers with transparent reputation tracking on-chain."
    }
  ];

  const stats = [
    { value: "50K+", label: "Verified Credentials" },
    { value: "200+", label: "Partner Institutions" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Global Access" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10 animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Own your education.
                <br />
                <span className="text-primary">Verify globally.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                The first blockchain-powered platform for issuing, storing, and verifying academic credentials. 
                Secure, transparent, and accessible anywhere in the world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button asChild variant="hero" size="hero" className="animate-glow w-full sm:w-auto min-w-[180px] whitespace-nowrap">
                  <Link to="/student">
                    <User className="w-5 h-5" />
                    Student Portal
                  </Link>
                </Button>
                <Button asChild variant="glass" size="hero" className="w-full sm:w-auto">
                  <Link to="/institution">
                    <Building className="w-10 h-5" />
                    Institution Portal
                  </Link>
                </Button>
                <Button asChild variant="outline" size="hero" className="w-full sm:w-auto">
                  <Link to="/verify">
                    <Search className="w-5 h-5" />
                    Verify Credential
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-float lg:ml-8 xl:ml-12">
              <img 
                src={heroImage} 
                alt="Digital credential vault with blockchain security" 
                className="rounded-2xl shadow-elevated w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CredVault?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built on cutting-edge blockchain technology to ensure your credentials are secure, 
              verifiable, and accessible globally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="credential-card p-8 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Credentials?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students and institutions already using blockchain-verified credentials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="hero" className="w-full sm:w-auto">
              <Link to="/student">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="hero" className="w-full sm:w-auto">
              <a href="#" className="flex items-center gap-2">
                View on Polygonscan
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}