"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, BarChart3, Target, Users, Zap, ArrowRight, Star, Play } from "lucide-react"
import { FeatureShowcase } from "@/components/feature-showcase"
import { FeatureTour } from "@/components/feature-tour"
import { useAuth, useUser } from '@clerk/nextjs'

export default function HomePage() {
  const [showFeatures, setShowFeatures] = useState(false)
  const [showTour, setShowTour] = useState(false)
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f5f4] via-[#ffffff] to-[#d9d8d6] dark:from-[#000000] dark:via-[#33322d] dark:to-[#000000]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative h-28 sm:h-14 w-44 sm:w-42 flex items-center justify-start overflow-visible">
              <img 
                src="/logo/jobflowblacklogo.png" 
                alt="JobFlow Logo" 
                className="absolute h-36 sm:h-36 w-auto object-contain dark:hidden transform scale-140" 
              />
              <img 
                src="/logo/jobflowwhitelogo.png" 
                alt="JobFlow Logo" 
                className="absolute h-36 sm:h-36 w-auto object-contain hidden dark:block transform scale-140" 
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-[#33322d] to-[#6f706b] hover:from-[#000000] hover:to-[#33322d] shadow-lg text-xs sm:text-sm px-3 sm:px-4 py-2 text-white">
                  Dashboard
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/sign-in">
                <Button className="bg-gradient-to-r from-[#33322d] to-[#6f706b] hover:from-[#000000] hover:to-[#33322d] shadow-lg text-xs sm:text-sm px-3 sm:px-4 py-2 text-white">
                  Sign In
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-2 sm:px-4 py-10 sm:py-16 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 sm:mb-6 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Smart Job Tracking
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-2">
            Track Your Job Applications
            <span className="gradient-text block mt-1 sm:mt-2">Like a Professional</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
            Organize, manage, and optimize your job search with our intelligent Job Tracker board. Get insights, track
            progress, and land your dream job faster.
          </p>

          <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12 px-2 sm:px-4">
            {isSignedIn ? (
              <Link href="/dashboard" className="w-full sm:w-auto sm:mx-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-[#33322d] to-[#6f706b] hover:from-[#000000] hover:to-[#33322d] text-white shadow-xl"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/sign-up" className="w-full sm:w-auto sm:mx-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-[#33322d] to-[#6f706b] hover:from-[#000000] hover:to-[#33322d] text-white shadow-xl"
                >
                  Start Tracking Jobs
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            )}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-center">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-lg bg-transparent hover:bg-[#f3f5f4] dark:hover:bg-[#33322d]"
                onClick={() => setShowTour(true)}
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Take Tour
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-lg bg-transparent hover:bg-[#f3f5f4] dark:hover:bg-[#33322d]"
                onClick={() => setShowFeatures(true)}
              >
                View Features
              </Button>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-2">
            <div className="flex items-center">
              <div className="flex -space-x-1 sm:-space-x-2 mr-2 sm:mr-3">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=128&h=128&q=80"
                  alt="User 1"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=128&h=128&q=80"
                  alt="User 2"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=128&h=128&q=80"
                  alt="User 3"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=128&h=128&q=80"
                  alt="User 4"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm">10,000+ job seekers</span>
            </div>
            <div className="flex items-center">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1" />
              <span className="text-xs sm:text-sm">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-2 sm:px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Everything you need to land your dream job
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            Powerful features designed to streamline your job search and maximize your success rate
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="mx-auto mb-3 sm:mb-4 p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Job Tracker Board</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Visualize your entire job pipeline with intuitive drag-and-drop columns and smart automation
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="mx-auto mb-3 sm:mb-4 p-2 sm:p-3 bg-green-100 dark:bg-green-900/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Track success rates, identify patterns, and optimize your job search strategy with detailed insights
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="mx-auto mb-3 sm:mb-4 p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Company Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Keep detailed company profiles, track interactions, and never miss important follow-ups
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="mx-auto mb-3 sm:mb-4 p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Status Automation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Automatically organize applications by status with smart notifications and reminders
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Preview Section */}
      <section className="container mx-auto px-2 sm:px-4 py-12 sm:py-16 lg:py-20">
  <div className="bg-gradient-to-r from-[#f3f5f4] to-[#d9d8d6] dark:from-[#33322d] dark:to-[#000000] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12">
        <div className="text-center mb-8 sm:mb-12">
          <Badge variant="outline" className="mb-3 sm:mb-4">
            <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Live Preview
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            See JobTracker in Action
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            Get a glimpse of your future dashboard and experience the power of organized job tracking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Mini Dashboard Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6 border order-2 lg:order-1">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold">Your Job Pipeline</h3>
              <Badge variant="secondary" className="text-xs">Live Demo</Badge>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {[
                { name: "Applied", count: 12, color: "bg-blue-100 text-blue-700" },
                { name: "Interview", count: 4, color: "bg-yellow-100 text-yellow-700" },
                { name: "Offer", count: 2, color: "bg-green-100 text-green-700" },
                { name: "Rejected", count: 3, color: "bg-red-100 text-red-700" }
              ].map((status) => (
                <div key={status.name} className="text-center">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 ${status.color} font-bold text-sm sm:text-base lg:text-lg`}>
                    {status.count}
                  </div>
                  <div className="text-xs text-muted-foreground">{status.name}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-xs sm:text-sm">Senior React Developer</div>
                    <div className="text-xs text-muted-foreground">TechCorp Inc. • ₹15L-18L</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700 text-xs">Interview</Badge>
                </div>
              </div>
              <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-xs sm:text-sm">Full Stack Engineer</div>
                    <div className="text-xs text-muted-foreground">StartupXYZ • ₹12L-15L</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 text-xs">Applied</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-sm sm:text-base">Organize Everything</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Drag-and-drop simplicity</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-sm sm:text-base">Track Progress</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Smart analytics & insights</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-sm sm:text-base">Stay Motivated</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Goals & reminders</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#33322d] to-[#6f706b] hover:from-[#000000] hover:to-[#33322d] text-white text-sm sm:text-base py-3 sm:py-4"
                onClick={() => setShowTour(true)}
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Start Interactive Tour
              </Button>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  className="flex-1 text-sm sm:text-base py-2 sm:py-3"
                  onClick={() => setShowFeatures(true)}
                >
                  Explore Features
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full text-sm sm:text-base py-2 sm:py-3">
                    {isSignedIn ? "Go to Dashboard" : "Try Dashboard"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-2 sm:px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Trusted by job seekers worldwide</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">10K+</div>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-1 sm:mb-2">50K+</div>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">Jobs Tracked</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">85%</div>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600 mb-1 sm:mb-2">4.9★</div>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">User Rating</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
    <section className="container mx-auto px-2 sm:px-4 py-12 sm:py-16 lg:py-20">
  <div className="text-center bg-gradient-to-r from-[#6f706b] to-[#33322d] rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-white mx-2 sm:mx-0">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Ready to supercharge your job search?</h3>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90">Join thousands of successful job seekers using JobFlow</p>
          {isSignedIn ? (
            <Link href="/dashboard">
              <Button size="lg" className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg bg-white text-[#33322d] hover:bg-gray-100 shadow-xl w-full sm:w-auto">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/sign-up">
              <Button size="lg" className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg bg-white text-[#33322d] hover:bg-gray-100 shadow-xl w-full sm:w-auto">
                Get Started Free Today
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 py-8 sm:py-12">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3 sm:mb-4">
                <div className="relative h-20 sm:h-16 w-40 sm:w-44 flex items-center justify-center sm:justify-start overflow-visible">
                  <img 
                    src="/logo/jobflowblacklogo.png" 
                    alt="JobFlow Logo" 
                    className="absolute h-36 sm:h-36 w-auto object-contain dark:hidden transform scale-140" 
                  />
                  <img 
                    src="/logo/jobflowwhitelogo.png" 
                    alt="JobFlow Logo" 
                    className="absolute h-36 sm:h-36 w-auto object-contain hidden dark:block transform scale-140" 
                  />
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-2 sm:px-0">
                The smartest way to track and manage your job applications.
              </p>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-600 dark:text-gray-400">
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

            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-600 dark:text-gray-400">
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

            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-600 dark:text-gray-400">
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

          <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <p>&copy;2025 JobFlow. Created by Rajat </p>
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
