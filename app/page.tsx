import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Target, BookOpen } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { FadeInSection } from "@/components/fade-in-section"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedLogo } from "@/components/animated-logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background page-transition">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20">
        <div className="max-w-6xl mx-auto text-center">
          <FadeInSection>
            <div className="mb-8">
              <AnimatedLogo size={120} showText={false} className="justify-center" />
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-green-500 to-blue-700 bg-clip-text text-transparent">
              🚀 Master Your Studies with AI
            </h1>
          </FadeInSection>

          <FadeInSection delay={400}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              🎯 Transform your study routine with personalized AI schedules, connect with study partners, and achieve
              your academic goals faster than ever! Join thousands of successful students.
            </p>
          </FadeInSection>

          <FadeInSection delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 hover-lift hover-glow transition-all duration-300 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
                >
                  🎓 Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  ⭐⭐⭐⭐⭐ <span className="font-semibold">4.9/5</span>
                </span>
                <span>•</span>
                <span>10,000+ Happy Students</span>
              </div>
            </div>
          </FadeInSection>

          {/* Floating elements */}
          <FadeInSection delay={800}>
            <div className="mt-16 relative">
              <div className="absolute top-0 left-1/4 animate-bounce" style={{ animationDelay: "0s" }}>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="absolute top-8 right-1/4 animate-bounce" style={{ animationDelay: "0.5s" }}>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="absolute top-16 left-1/3 animate-bounce" style={{ animationDelay: "1s" }}>
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <FadeInSection direction="scale" delay={100}>
              <div className="space-y-2">
                <div className="text-4xl font-bold">
                  <AnimatedCounter end={10000} suffix="+" />
                </div>
                <p className="text-blue-100">🎓 Students Helped</p>
              </div>
            </FadeInSection>

            <FadeInSection direction="scale" delay={200}>
              <div className="space-y-2">
                <div className="text-4xl font-bold">
                  <AnimatedCounter end={95} suffix="%" />
                </div>
                <p className="text-blue-100">📈 Success Rate</p>
              </div>
            </FadeInSection>

            <FadeInSection direction="scale" delay={300}>
              <div className="space-y-2">
                <div className="text-4xl font-bold">
                  <AnimatedCounter end={50000} suffix="+" />
                </div>
                <p className="text-blue-100">⏰ Study Hours Optimized</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-center mb-4">🚀 How StudyCrew.AI Works</h2>
            <p className="text-center text-muted-foreground mb-12">
              Get started in 3 simple steps and transform your study game!
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection direction="up" delay={100} className="stagger-1">
              <div className="text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Set Your Goals</h3>
                <p className="text-muted-foreground">Tell us your subjects, available time, and academic goals</p>
              </div>
            </FadeInSection>

            <FadeInSection direction="up" delay={200} className="stagger-2">
              <div className="text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">2. AI Creates Your Plan</h3>
                <p className="text-muted-foreground">
                  Our smart AI analyzes your data and creates a personalized schedule
                </p>
              </div>
            </FadeInSection>

            <FadeInSection direction="up" delay={300} className="stagger-3">
              <div className="text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Achieve Success</h3>
                <p className="text-muted-foreground">
                  Follow your plan, track progress, and reach your academic goals!
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-center mb-4">✨ Why Students Love StudyCrew.AI</h2>
            <p className="text-center text-muted-foreground mb-12">
              Powerful features designed specifically for student success
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection direction="left" delay={100}>
              <Card className="hover-lift hover-glow transition-all duration-300 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">🎯 Smart AI Planning</h3>
                  <p className="text-muted-foreground">
                    AI creates custom study plans based on your learning style, schedule, and goals
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection direction="up" delay={200}>
              <Card className="hover-lift hover-glow transition-all duration-300 border-green-200 dark:border-green-800">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">📈 Progress Tracking</h3>
                  <p className="text-muted-foreground">
                    Track your study streaks, achievements, and see your improvement over time
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection direction="right" delay={300}>
              <Card className="hover-lift hover-glow transition-all duration-300 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">🤝 Study Community</h3>
                  <p className="text-muted-foreground">
                    Connect with study partners, join groups, and learn together with peers
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-center mb-4">💬 What Students Are Saying</h2>
            <p className="text-center text-muted-foreground mb-12">Real success stories from real students</p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "StudyCrew.AI completely transformed my study routine! I went from struggling to straight A's! 🎉",
                author: "Sarah M., Computer Science",
                rating: "⭐⭐⭐⭐⭐",
                delay: 100,
              },
              {
                text: "The AI study plans are incredibly accurate. It knows exactly when I need breaks! 🤖✨",
                author: "Mike T., Engineering",
                rating: "⭐⭐⭐⭐⭐",
                delay: 200,
              },
              {
                text: "Found amazing study partners through the platform. Group sessions are so much more effective! 👥📚",
                author: "Emma L., Biology",
                rating: "⭐⭐⭐⭐⭐",
                delay: 300,
              },
            ].map((testimonial, index) => (
              <FadeInSection key={index} direction="scale" delay={testimonial.delay}>
                <Card className="hover-lift transition-all duration-300 bg-gradient-to-br from-white to-blue-50 dark:from-background dark:to-blue-950/20">
                  <CardContent className="p-6">
                    <div className="mb-4 text-lg">{testimonial.rating}</div>
                    <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                    <p className="font-semibold">- {testimonial.author}</p>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold mb-4">🚀 Ready to Transform Your Studies?</h2>
            <p className="text-xl mb-8 text-blue-100">Join thousands of successful students using StudyCrew.AI</p>
            <Link href="/signup">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50 hover-lift hover-glow transition-all duration-300"
              >
                🎓 Get Started Free - No Credit Card Required
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection direction="up">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="mb-4">
                  <AnimatedLogo size={32} showText={true} />
                </div>
                <p className="text-muted-foreground">🚀 AI-powered study planning for modern students</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link href="/about" className="hover:text-foreground transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-foreground transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="hover:text-foreground transition-colors">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link href="/privacy" className="hover:text-foreground transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-foreground transition-colors">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link href="/help" className="hover:text-foreground transition-colors">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="hover:text-foreground transition-colors">
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 StudyCrew.AI. All rights reserved. Made with 💙 for students worldwide 🌍</p>
            </div>
          </FadeInSection>
        </div>
      </footer>
    </div>
  )
}
