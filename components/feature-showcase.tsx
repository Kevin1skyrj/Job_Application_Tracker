"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Target, 
  BarChart3, 
  Users, 
  Briefcase, 
  Calendar,
  Bell,
  Zap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Play,
  Star,
  Clock,
  FileText,
  DollarSign,
  IndianRupee,
  Building2
} from "lucide-react"
import Link from "next/link"

interface FeatureShowcaseProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeatureShowcase({ open, onOpenChange }: FeatureShowcaseProps) {
  const [activeDemo, setActiveDemo] = useState("kanban")

  const features = [
    {
      id: "kanban",
      title: "Job Tracker Board",
      icon: Target,
      color: "blue",
      description: "Drag-and-drop job tracking with intelligent automation",
      benefits: ["Visual pipeline management", "Smart status updates", "Bulk operations", "Custom columns"],
      demo: (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {["Applied", "Interviewing", "Offer", "Rejected"].map((status, i) => (
              <div key={status} className="space-y-2">
                <div className="text-sm font-medium text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  {status}
                </div>
                <div className="space-y-2">
                  {Array.from({ length: i + 1 }, (_, j) => (
                    <div key={j} className="p-3 bg-white dark:bg-gray-700 rounded border shadow-sm text-xs">
                      <div className="font-medium">Frontend Developer</div>
                      <div className="text-gray-500">TechCorp Inc.</div>
                      <div className="flex items-center gap-1 mt-1">
                        <IndianRupee className="h-3 w-3" />
                        <span>₹12L - ₹15L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "analytics",
      title: "Advanced Analytics",
      icon: BarChart3,
      color: "green",
      description: "Comprehensive insights to optimize your job search",
      benefits: ["Application success rates", "Timeline tracking", "Salary insights", "Performance metrics"],
      demo: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">73.5%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                    <p className="text-2xl font-bold">5.2 days</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="h-32 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded flex items-center justify-center">
            <span className="text-sm text-muted-foreground">📊 Interactive Charts & Graphs</span>
          </div>
        </div>
      )
    },
    {
      id: "goals",
      title: "Goal & Reminder System",
      icon: Bell,
      color: "purple",
      description: "Stay on track with smart goals and reminders",
      benefits: ["Monthly application goals", "Interview reminders", "Follow-up tracking", "Priority management"],
      demo: (
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Monthly Goal: 25 Applications</span>
              <Badge variant="secondary">18/25</Badge>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: "72%" }} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <Bell className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Interview with TechCorp tomorrow at 2:00 PM</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Follow up with StartupXYZ (Applied 1 week ago)</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "intelligence",
      title: "Company Intelligence",
      icon: Users,
      color: "orange",
      description: "Deep insights into companies and opportunities",
      benefits: ["Company profiles", "Salary benchmarks", "Interview insights", "Network connections"],
      demo: (
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">TechCorp Inc.</CardTitle>
                  <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <span className="ml-1 font-medium">1,000+ employees</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="ml-1 font-medium">Software</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Avg Salary:</span>
                  <span className="ml-1 font-medium">₹15-20L</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Rating:</span>
                  <span className="ml-1 font-medium flex items-center gap-1">
                    4.2 <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  const currentFeature = features.find(f => f.id === activeDemo) || features[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
  <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-[#f3f5f4] to-[#d9d8d6] dark:from-[#33322d] dark:to-[#000000]">
          <DialogTitle className="text-2xl font-bold">
            🚀 Explore JobTracker Features
          </DialogTitle>
          <p className="text-muted-foreground">
            Discover how JobTracker can transform your job search experience
          </p>
        </DialogHeader>

        <div className="flex h-full max-h-[calc(90vh-100px)]">
          {/* Feature Navigation */}
          <div className="w-80 border-r bg-gray-50 dark:bg-gray-800/50 p-6 overflow-y-auto">
            <div className="space-y-3">
              {features.map((feature) => {
                const Icon = feature.icon
                const isActive = activeDemo === feature.id
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveDemo(feature.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-white dark:bg-gray-700 shadow-md border-l-4 border-blue-500' 
                        : 'hover:bg-white dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        feature.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        feature.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                        feature.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        'bg-orange-100 dark:bg-orange-900/30'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          feature.color === 'blue' ? 'text-blue-600' :
                          feature.color === 'green' ? 'text-green-600' :
                          feature.color === 'purple' ? 'text-purple-600' :
                          'text-orange-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* CTA Section */}
            <div className="mt-8 p-4 bg-gradient-to-r from-[#6f706b] to-[#33322d] rounded-lg text-white">
              <h4 className="font-semibold mb-2">Ready to get started?</h4>
              <p className="text-sm mb-3 text-blue-100">
                Join thousands of successful job seekers today!
              </p>
              <Link href="/dashboard">
                <Button 
                  className="w-full bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => onOpenChange(false)}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Demo Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl">
              {/* Feature Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${
                    currentFeature.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    currentFeature.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                    currentFeature.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                    'bg-orange-100 dark:bg-orange-900/30'
                  }`}>
                    <currentFeature.icon className={`h-8 w-8 ${
                      currentFeature.color === 'blue' ? 'text-blue-600' :
                      currentFeature.color === 'green' ? 'text-green-600' :
                      currentFeature.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{currentFeature.title}</h2>
                    <p className="text-muted-foreground">{currentFeature.description}</p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {currentFeature.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Demo */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Live Demo
                  </h3>
                  <Badge variant="secondary">Interactive</Badge>
                </div>
                {currentFeature.demo}
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  {currentFeature.id === 'kanban' && "Use keyboard shortcuts to quickly move jobs between columns and boost your productivity!"}
                  {currentFeature.id === 'analytics' && "Set up weekly analytics reviews to identify patterns and improve your application strategy."}
                  {currentFeature.id === 'goals' && "Break down your monthly goals into weekly targets for better tracking and motivation."}
                  {currentFeature.id === 'intelligence' && "Research companies before applying to tailor your applications and increase success rates."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
