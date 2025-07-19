"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Target,
  BarChart3,
  Bell,
  Users,
  Play,
  X
} from "lucide-react"

interface FeatureTourProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const tourSteps = [
  {
    id: 1,
    title: "Welcome to JobTracker! 🎉",
    description: "Let's take a quick tour of the powerful features that will transform your job search.",
    content: (
      <div className="text-center space-y-6">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
          <Target className="h-12 w-12 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Ready to transform your job search?</h3>
          <p className="text-muted-foreground">
            This interactive tour will show you exactly how JobTracker can help you land your dream job faster and more efficiently.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Visual job tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Smart analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Goal management</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Company insights</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Job Tracker Board 📋",
    description: "Visualize your entire job pipeline with drag-and-drop simplicity.",
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">🎯 What makes it special?</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Drag and drop jobs between columns effortlessly</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Auto-save every change - never lose your progress</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Color-coded status for instant visual feedback</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Quick actions menu on every job card</span>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs">
          {["Applied", "Interviewing", "Offer", "Rejected"].map((status, i) => (
            <div key={status} className="text-center">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded mb-2 font-medium">{status}</div>
              <div className="space-y-1">
                {Array.from({ length: Math.max(1, 3 - i) }, (_, j) => (
                  <div key={j} className="p-2 bg-white dark:bg-gray-700 rounded border text-[10px]">
                    Job {j + 1}
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
    id: 3,
    title: "Advanced Analytics 📊",
    description: "Get insights that help you optimize your job search strategy.",
    content: (
      <div className="space-y-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">📈 Track your success</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
              <div className="text-2xl font-bold text-green-600">73.5%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
              <div className="text-2xl font-bold text-blue-600">5.2</div>
              <div className="text-xs text-muted-foreground">Avg Response (days)</div>
            </div>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            <span>Application trends and patterns</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-green-500" />
            <span>Success rate by company size and industry</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-purple-500" />
            <span>Salary insights and market data</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-orange-500" />
            <span>Timeline analysis for better planning</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Smart Goals & Reminders 🎯",
    description: "Stay motivated and never miss important deadlines.",
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">🎯 Goal Tracking</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Monthly Applications</span>
                <span>18/25</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div className="text-xs text-muted-foreground">
              You're 72% toward your monthly goal! Keep it up! 🚀
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
            <Bell className="h-4 w-4 text-yellow-600" />
            <span>Interview with TechCorp in 2 hours</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
            <Bell className="h-4 w-4 text-blue-600" />
            <span>Follow up with StartupXYZ (1 week)</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Company Intelligence 🏢",
    description: "Research companies and track your interactions effectively.",
    content: (
      <div className="space-y-4">
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
              TC
            </div>
            <div>
              <div className="font-semibold">TechCorp Inc.</div>
              <div className="text-xs text-muted-foreground">San Francisco, CA</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>Size: 1,000+ employees</div>
            <div>Industry: Software</div>
            <div>Avg Salary: ₹15-20L</div>
            <div>Rating: 4.2 ⭐</div>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span>Detailed company profiles and insights</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-green-500" />
            <span>Salary benchmarks and market data</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-500" />
            <span>Interview process and company culture</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-orange-500" />
            <span>Network connections and referrals</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Ready to Start? 🚀",
    description: "You're all set! Let's begin your journey to landing your dream job.",
    content: (
      <div className="text-center space-y-6">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Congratulations! 🎉</h3>
          <p className="text-muted-foreground mb-4">
            You now know how JobTracker can revolutionize your job search. Ready to get started?
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">10,000+</div>
              <div className="text-xs text-muted-foreground">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Join thousands of successful job seekers who found their dream jobs with JobTracker!
        </p>
      </div>
    )
  }
]

export function FeatureTour({ open, onOpenChange }: FeatureTourProps) {
  const [currentStep, setCurrentStep] = useState(1)
  
  const currentStepData = tourSteps.find(step => step.id === currentStep) || tourSteps[0]
  const progress = (currentStep / tourSteps.length) * 100

  const nextStep = () => {
    if (currentStep < tourSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setCurrentStep(1)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div>
            <DialogTitle className="text-xl">{currentStepData.title}</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {currentStepData.description}
            </p>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Step {currentStep} of {tourSteps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="py-6">
          {currentStepData.content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {tourSteps.map((step) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full transition-colors ${
                  step.id === currentStep
                    ? 'bg-blue-600'
                    : step.id < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          {currentStep === tourSteps.length ? (
            <Button
              onClick={handleClose}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Start Using JobTracker
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
