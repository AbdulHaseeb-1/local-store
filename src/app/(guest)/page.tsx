import CategoryBar from "@/components/guest/root/categoryBar"
import Products from "@/components/guest/root/products"
import "@/../public/css/root.css"
import Footer from "@/components/guest/root/footer"
import Hero from "@/components/guest/root/hero"
import Services from "@/components/guest/root/services"
import BestChoices from "@/components/guest/root/bestChoices"


export default function Home() {
  return (
    <div className="">
      <Hero />
      <div className="">
        <Products />
        <CategoryBar />
        <BestChoices />
        <Services />
        <Footer />
      </div>
    </div>
  )
}