// Update this page - NextDoc UK Mentor Dashboard

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Users, CheckSquare, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <div className="text-primary-foreground font-bold text-lg">ND</div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">NextDoc UK</h1>
              <Badge variant="secondary" className="ml-2">Mentor Dashboard</Badge>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering Healthcare
            <br />
            <span className="text-primary">Mentorship</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive mentor dashboard for CVPro™, InterviewSim+™, SponsorMatch™, and GapMap™ - 
            supporting UK healthcare professionals on their journey.
          </p>
          
          <Button size="lg" className="text-lg px-8" asChild>
            <a href="/mentor">
              Enter Mentor Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-product-cvpro/10 flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="h-6 w-6 text-product-cvpro" />
            </div>
            <h3 className="font-semibold mb-2">CVPro™</h3>
            <p className="text-sm text-muted-foreground">AI CV Review & Mentor Polish</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-product-interviewsim/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-product-interviewsim" />
            </div>
            <h3 className="font-semibold mb-2">InterviewSim+™</h3>
            <p className="text-sm text-muted-foreground">AI Interview Simulator</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-product-sponsormatch/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-product-sponsormatch" />
            </div>
            <h3 className="font-semibold mb-2">SponsorMatch™</h3>
            <p className="text-sm text-muted-foreground">Smart Trust Matcher</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-product-gapmap/10 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-product-gapmap" />
            </div>
            <h3 className="font-semibold mb-2">GapMap™</h3>
            <p className="text-sm text-muted-foreground">AI-Powered Visual Career Roadmap</p>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Index;
