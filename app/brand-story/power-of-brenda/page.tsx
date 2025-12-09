import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'

export default function PowerOfBrendaPage() {
  return (
    <div className="flex-1 overflow-auto">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            The Power of <span className="text-primary">Postcodes</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Postcode Lottery Group Brand Story
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              src="https://player.vimeo.com/video/986366526?title=0&byline=0&portrait=0"
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 01. Brand Manifesto */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">01</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Brand Manifesto</h2>
          
          <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden mb-12">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80"
              alt="Community connection"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-2xl font-medium">The humble postcode.</p>
            <p className="text-2xl font-medium">What if it held the power to change communities, nations — and beyond?</p>
            
            <Separator className="my-12" />
            
            <p className="text-xl">
              The Postcode Lottery Group believes every postcode is a force for good.
            </p>
            <p className="text-xl">
              A simple set of letters and numbers that can spread joy, brighten days,
              and make life better for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* 02. Brand Platform */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">02</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Brand Platform</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-bold mb-4">THE POWER OF POSTCODES</h3>
              <p className="text-xl text-muted-foreground">
                The power of postcodes to make life better for everyone.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="text-2xl font-semibold mb-4">Brand Belief</h3>
              <p className="text-lg leading-relaxed">
                We use postcodes as a force for good — improving everyday lives
                and funding a healthier, fairer, greener world.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Brand Mindset</h3>
              <ul className="space-y-2 text-lg">
                <li>• Sharing</li>
                <li>• Courageous</li>
                <li>• Fun</li>
                <li>• Sustainable</li>
              </ul>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">Customer Belief</h3>
              <p className="text-2xl font-bold text-primary">"I win, we win, they win."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Brand Pillars */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">03</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Brand Pillars</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="p-8">
                <div className="text-4xl font-bold mb-2">1</div>
                <h3 className="text-2xl font-semibold mb-2">Community</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <div className="text-4xl font-bold mb-2">2</div>
                <h3 className="text-2xl font-semibold mb-2">Everyday Impact</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <div className="text-4xl font-bold mb-2">3</div>
                <h3 className="text-2xl font-semibold mb-2">Joy</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <div className="text-4xl font-bold mb-2">4</div>
                <h3 className="text-2xl font-semibold mb-2">Meaningful Life Changes</h3>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Proof Points</h3>
            <ul className="space-y-3 text-lg">
              <li>• Real winners</li>
              <li>• Shared prizes</li>
              <li>• Scale & variety</li>
              <li>• Life-enhancing to life-changing impact</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 04. Personality & Story Themes */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">04</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Personality & Story Themes</h2>
          
          <div className="space-y-16">
            <div>
              <h3 className="text-3xl font-bold mb-4">We're Optimists</h3>
              <p className="text-xl leading-relaxed">
                Every win — big or small — can make a real difference.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">Stories of Hope</h3>
              <p className="text-xl leading-relaxed">
                Over €8 billion in prize money has generated countless human stories
                filled with optimism, relief, and joy.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">Joy Spreaders</h3>
              <p className="text-xl leading-relaxed">
                We surprise, we celebrate, and we bring people together.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">Game Changers</h3>
              <p className="text-xl leading-relaxed mb-4">
                35 years ago, we invented a new way to win.
                We continue to innovate, always in service of community impact.
              </p>
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden mt-6">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
                  alt="Innovation and community"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">Together</h3>
              <p className="text-xl leading-relaxed">
                The power of postcodes is collective.
                We help people come together — across streets, villages, and nations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05. How the Brand Comes to Life */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">05</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">How the Brand Comes to Life</h2>
          
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden mb-12">
            <Image
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80"
              alt="Brand in action"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Brand comms create emotional connection and build long-term brand love.
              This increases effectiveness, drives sales, reduces price sensitivity,
              and improves lifetime value.
            </p>
            <p className="text-xl font-medium">
              Our job:
            </p>
            <p className="text-xl">
              Bring "the power of postcodes" to life in everything we make —
              from large cultural moments to everyday interactions.
            </p>
          </div>
        </div>
      </section>

      {/* 06. Customer Experience */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">06</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Customer Experience</h2>
          
          <div className="space-y-8">
            <p className="text-xl font-medium">
              Customer experience should live and breathe our positioning.
            </p>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Touchpoints we must own</h3>
              <ul className="space-y-2 text-lg">
                <li>• Website</li>
                <li>• My account</li>
                <li>• Email marketing</li>
                <li>• Online help</li>
                <li>• Phone</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Passion points we should connect with</h3>
              <ul className="space-y-2 text-lg">
                <li>• Local belonging</li>
                <li>• Grassroots communities</li>
                <li>• Fairness and leveling the playing field</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Content we must create</h3>
              <p className="text-lg leading-relaxed">
                Show moments where a postcode is powerful.
                Celebrate postcode stories, legends, milestones, and transitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 07. Storytelling in Brand Experience */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">07</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Storytelling in Brand Experience</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Authenticity & relatability</h3>
              <p className="text-lg leading-relaxed">
                We are for everyone — not just a lucky few.
                We celebrate everyday people across all nations.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Scale & variety</h3>
              <p className="text-lg leading-relaxed">
                Every win has the power to make a change.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Optimism & creativity</h3>
              <p className="text-lg leading-relaxed">
                We show solutions, not problems.
                We inspire players to believe things can change for the better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 08. Tone of Voice Principles */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">08</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Tone of Voice Principles</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">We are:</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✔</span>
                  <span>For everyone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✔</span>
                  <span>Witty, real, human</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✔</span>
                  <span>Friendly, inclusive, collective</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✔</span>
                  <span>Playful, fun</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✔</span>
                  <span>Compassionate (where needed)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✔</span>
                  <span>Local (per market)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✔</span>
                  <span>Heart-warming, down-to-earth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✔</span>
                  <span>Inspiring, passionate</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">We are not:</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✘</span>
                  <span>Elitist</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✘</span>
                  <span>Slapstick-funny</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✘</span>
                  <span>Individualistic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✘</span>
                  <span>Pushy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✘</span>
                  <span>Condescending</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✘</span>
                  <span>Cheesy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✘</span>
                  <span>Formal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✘</span>
                  <span>Jargon-filled</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✘</span>
                  <span>Complex</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✘</span>
                  <span>Cynical</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 09. Distinctive Brand Assets */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">09</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Distinctive Brand Assets</h2>
          
          <p className="text-lg mb-8 leading-relaxed">
            Distinctive assets create mental shortcuts — making our brand instantly recognisable.
          </p>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Core Distinctive Assets</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-lg">
                <li>• Country logos</li>
                <li>• Gold envelope</li>
                <li>• Cheque</li>
                <li>• Ambassadors</li>
              </ul>
              <ul className="space-y-2 text-lg">
                <li>• Real winners</li>
                <li>• Colour palette</li>
                <li>• Prize fund gold lettering</li>
                <li>• Confetti</li>
              </ul>
            </div>
          </div>

          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mt-12">
            <Image
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80"
              alt="Brand assets"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 10. Visual Asset Library */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">10</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Visual Asset Library</h2>
          
          <p className="text-lg mb-8 leading-relaxed">
            The library helps maintain a consistent international visual identity.
          </p>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Included areas:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-lg">
                <li>• Logos</li>
                <li>• Colour palette</li>
                <li>• Typography</li>
                <li>• Supporting graphics</li>
                <li>• Icons</li>
                <li>• Cheques & golden envelope</li>
                <li>• Tickets</li>
              </ul>
              <ul className="space-y-2 text-lg">
                <li>• Plus & Premium style guides</li>
                <li>• Photography style guide</li>
                <li>• Ambassador & team clothing</li>
                <li>• Vehicles</li>
                <li>• Prize plan graphics</li>
                <li>• PLG logo guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Colour Palette */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">11</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Colour Palette</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-[#E30027]"></div>
                <div>
                  <p className="font-semibold">Red (signature)</p>
                  <p className="text-sm text-muted-foreground">C0 M100 Y100 K0 — #E30027</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-[#F59300]"></div>
                <div>
                  <p className="font-semibold">Orange</p>
                  <p className="text-sm text-muted-foreground">#F59300</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-[#009B00]"></div>
                <div>
                  <p className="font-semibold">Green</p>
                  <p className="text-sm text-muted-foreground">#009B00</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-[#0050A5]"></div>
                <div>
                  <p className="font-semibold">Blue</p>
                  <p className="text-sm text-muted-foreground">#0050A5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Golden 3D Numbers */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">12</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Golden 3D Numbers</h2>
          
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
            <Image
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80"
              alt="Golden 3D numbers"
              fill
              className="object-cover"
            />
          </div>

          <p className="text-lg leading-relaxed">
            Used across international markets for product consistency & instant recognition.
          </p>
        </div>
      </section>

      {/* 13. Employer Brand & EVP */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm font-medium text-muted-foreground mb-4">13</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Employer Brand & EVP</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">What is our Employer Brand?</h3>
              <p className="text-lg leading-relaxed">
                It defines how we present ourselves in the job market
                and reflects what employees can expect from us.
              </p>
              <p className="text-lg font-medium mt-4">
                Goal: Become employer of choice by leveraging our unique culture.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">What is an EVP?</h3>
              <p className="text-lg leading-relaxed">
                An EVP (Employee Value Proposition) communicates
                why people should work here — and stay here.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">EVP Pillars</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">Open</h4>
                    <p className="text-muted-foreground">welcoming, friendly</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">Determined</h4>
                    <p className="text-muted-foreground">passionate, results-driven</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">Collaborative</h4>
                    <p className="text-muted-foreground">multidisciplinary, improvement-focused</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">Playful</h4>
                    <p className="text-muted-foreground">fun, connective</p>
                  </CardContent>
                </Card>
                <Card className="md:col-span-2">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">Purposeful</h4>
                    <p className="text-muted-foreground">impactful, sustainable</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 border-t">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© Postcode Lottery Group, 2024</p>
        </div>
      </section>
    </div>
  )
}

