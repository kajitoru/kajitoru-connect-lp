import Hero from '@/components/Hero'
import CareerPath from '@/components/CareerPath'
import ExploreKajitoru from '@/components/ExploreKajitoru'
import About from '@/components/About'
import StayConnected from '@/components/StayConnected'
import ConnectForm from '@/components/ConnectForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <CareerPath />
      <ExploreKajitoru />
      <About />
      <StayConnected />
      <ConnectForm />
      <Footer />
    </main>
  )
}
