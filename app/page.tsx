import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Calendar, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { FadeInSection } from "@/components/fade-in-section"
import { AnimatedCounter } from "@/components/animated-counter"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background page-transition">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <FadeInSection>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Master Your Time with AI-Powered Study Plans
            </h1>
          </FadeInSection>

          <FadeInSection delay={200}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your study routine with personalized schedules, connect with study partners, and achieve your
              academic goals faster than ever.
            </p>
          </FadeInSection>

          <FadeInSection delay={400}>
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-6 hover-lift hover-glow transition-all duration-300">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </FadeInSection>

          {/* Floating Brain Icon */}
          <FadeInSection delay={600}>
            <div className="mt-16">
              <Brain className="h-24 w-24 text-blue-600 mx-auto animate-float" />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <FadeInSection direction="scale" delay={100}>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">
                  <AnimatedCounter end={10000} suffix="+" />
                </div>
                <p className="text-muted-foreground">Students Helped</p>
              </div>
            </FadeInSection>

            <FadeInSection direction="scale" delay={200}>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-purple-600">
                  <AnimatedCounter end={95} suffix="%" />
                </div>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
            </FadeInSection>

            <FadeInSection direction="scale" delay={300}>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-green-600">
                  <AnimatedCounter end={50000} suffix="+" />
                </div>
                <p className="text-muted-foreground">Study Hours Optimized</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection direction="up" delay={100} className="stagger-1">
              <div className="text-center hover-lift">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
                  <span className="text-2xl font-bold text-blue-600 animate-bounce-in">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
                <p className="text-muted-foreground">Create your account and tell us about your study goals</p>
              </div>
            </FadeInSection>

            <FadeInSection direction="up" delay={200} className="stagger-2">
              <div className="text-center hover-lift">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
                  <span className="text-2xl font-bold text-purple-600 animate-bounce-in">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Add Subjects</h3>
                <p className="text-muted-foreground">Input your subjects, topics, and available study time</p>
              </div>
            </FadeInSection>

            <FadeInSection direction="up" delay={300} className="stagger-3">
              <div className="text-center hover-lift">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
                  <span className="text-2xl font-bold text-green-600 animate-bounce-in">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Your Smart Plan</h3>
                <p className="text-muted-foreground">Receive a personalized AI-generated study schedule</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection direction="left" delay={100}>
              <Card className="hover-lift hover-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-float" />
                  <h3 className="text-xl font-semibold mb-2">Personalized Schedule</h3>
                  <p className="text-muted-foreground">
                    AI creates custom study plans based on your learning style and availability
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection direction="up" delay={200}>
              <Card className="hover-lift hover-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Calendar
                    className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-float"
                    style={{ animationDelay: "1s" }}
                  />
                  <h3 className="text-xl font-semibold mb-2">AI-Based Planning</h3>
                  <p className="text-muted-foreground">
                    Smart algorithms optimize your study time for maximum efficiency
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection direction="right" delay={300}>
              <Card className="hover-lift hover-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users
                    className="h-12 w-12 text-green-600 mx-auto mb-4 animate-float"
                    style={{ animationDelay: "2s" }}
                  />
                  <h3 className="text-xl font-semibold mb-2">Student Community</h3>
                  <p className="text-muted-foreground">
                    Connect with study partners and join collaborative learning sessions
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
            <h2 className="text-3xl font-bold text-center mb-12">What Students Say</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "StudyCrew completely transformed my study routine. I'm more organized and productive than ever!",
                author: "Sarah M., Computer Science",
                delay: 100,
              },
              {
                text: "The AI study plans are incredibly accurate. It knows exactly when I need breaks!",
                author: "Mike T., Engineering",
                delay: 200,
              },
              {
                text: "Found amazing study partners through the platform. Group sessions are so much more effective!",
                author: "Emma L., Biology",
                delay: 300,
              },
            ].map((testimonial, index) => (
              <FadeInSection key={index} direction="scale" delay={testimonial.delay}>
                <Card className="hover-lift transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                    <p className="font-semibold">- {testimonial.author}</p>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection direction="up">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Brain className="h-6 w-6 text-blue-600" />
                  StudyCrew
                </h3>
                <p className="text-muted-foreground">AI-powered study planning for modern students</p>
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
              <p>&copy; 2024 StudyCrew. All rights reserved.</p>
            </div>
          </FadeInSection>
        </div>
      </footer>
    </div>
  )
}
