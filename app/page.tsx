import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import Team from '@/components/home/Team'
import Gallery from '@/components/home/Gallery'
import Testimonials from '@/components/home/Testimonials'
import AIAdvisor from '@/components/ai/AIAdvisor'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <AIAdvisor />
      <Team />
      <Gallery />
      <Testimonials />
      <Footer />
    </main>
  )
}
