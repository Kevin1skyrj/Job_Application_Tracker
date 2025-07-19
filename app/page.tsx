"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, BarChart3, Target, Users, Zap, ArrowRight, Star, Play } from "lucide-react"
import { FeatureShowcase } from "@/components/feature-showcase"
import { FeatureTour } from "@/components/feature-tour"

export default function HomePage() {
  const [showFeatures, setShowFeatures] = useState(false)
  const [showTour, setShowTour] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/logo/logoJobflow.png" 
                alt="JobFlow Logo" 
                className="h-10 w-auto object-contain -my-2" 
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Smart Job Tracking
          </Badge>

          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Track Your Job Applications
            <span className="gradient-text block mt-2">Like a Professional</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Organize, manage, and optimize your job search with our intelligent Job Tracker board. Get insights, track
            progress, and land your dream job faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl"
              >
                Start Tracking Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="px-6 py-4 text-lg bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => setShowTour(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Take Tour
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-6 py-4 text-lg bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => setShowFeatures(true)}
              >
                View Features
              </Button>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white dark:border-gray-800"
                  />
                ))}
              </div>
              <span>10,000+ job seekers</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to land your dream job
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features designed to streamline your job search and maximize your success rate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Job Tracker Board</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Visualize your entire job pipeline with intuitive drag-and-drop columns and smart automation
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Track success rates, identify patterns, and optimize your job search strategy with detailed insights
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Company Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Keep detailed company profiles, track interactions, and never miss important follow-ups
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <Briefcase className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Status Automation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Automatically organize applications by status with smart notifications and reminders
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Preview Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 lg:p-12">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Play className="w-4 h-4 mr-2" />
            Live Preview
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            See JobTracker in Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get a glimpse of your future dashboard and experience the power of organized job tracking
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Mini Dashboard Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Your Job Pipeline</h3>
              <Badge variant="secondary">Live Demo</Badge>
            </div>
            
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { name: "Applied", count: 12, color: "bg-blue-100 text-blue-700" },
                { name: "Interview", count: 4, color: "bg-yellow-100 text-yellow-700" },
                { name: "Offer", count: 2, color: "bg-green-100 text-green-700" },
                { name: "Rejected", count: 3, color: "bg-red-100 text-red-700" }
              ].map((status) => (
                <div key={status.name} className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${status.color} font-bold text-lg`}>
                    {status.count}
                  </div>
                  <div className="text-xs text-muted-foreground">{status.name}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Senior React Developer</div>
                    <div className="text-xs text-muted-foreground">TechCorp Inc. • ₹15L-18L</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700 text-xs">Interview</Badge>
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Full Stack Engineer</div>
                    <div className="text-xs text-muted-foreground">StartupXYZ • ₹12L-15L</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 text-xs">Applied</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Organize Everything</div>
                  <div className="text-sm text-muted-foreground">Drag-and-drop simplicity</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Track Progress</div>
                  <div className="text-sm text-muted-foreground">Smart analytics & insights</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Stay Motivated</div>
                  <div className="text-sm text-muted-foreground">Goals & reminders</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => setShowTour(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Start Interactive Tour
              </Button>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowFeatures(true)}
                >
                  Explore Features
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Try Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Trusted by job seekers worldwide</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
            <p className="text-gray-600 dark:text-gray-400">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
            <p className="text-gray-600 dark:text-gray-400">Jobs Tracked</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">85%</div>
            <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">4.9★</div>
            <p className="text-gray-600 dark:text-gray-400">User Rating</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-16 text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to supercharge your job search?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of successful job seekers using JobTracker</p>
          <Link href="/dashboard">
            <Button size="lg" className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
              Get Started Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2">
                <img 
                  src="/logo/logoJobflow.png" 
                  alt="JobFlow Logo" 
                  className="h-10 w-auto object-contain" 
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                The smartest way to track and manage your job applications.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-blue-600">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Status
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 JobTracker. Built with Next.js and ❤️</p>
          </div>
        </div>
      </footer>

      {/* Feature Showcase Modal */}
      <FeatureShowcase open={showFeatures} onOpenChange={setShowFeatures} />
      
      {/* Feature Tour Modal */}
      <FeatureTour open={showTour} onOpenChange={setShowTour} />
    </div>
  )
}
