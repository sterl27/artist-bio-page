import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Bio } from "./components/Bio";
import { Gallery } from "./components/Gallery";
import { VideoSection } from "./components/VideoSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans selection:bg-stone-700 selection:text-stone-50">
      <Header />
      <main>
        <Hero />
        <Bio />
        <Gallery />
        <VideoSection />
      </main>
      <Footer />
    </div>
  );
}
