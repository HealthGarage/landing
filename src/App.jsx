import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import WhyUs from './components/WhyUs'
import Services from './components/Services'
import ImportantInfo from './components/ImportantInfo'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Booking from './components/Booking'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <AboutUs />
      <WhyUs />
      <Services />
      <Testimonials />
      <ImportantInfo />
      <FAQ />
      <Booking />
      <Footer />
    </div>
  )
}

export default App
