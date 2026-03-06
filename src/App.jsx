import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Process from './components/Process';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollCat from './components/ScrollCat';
import { QuoteBand, SectionDivider } from './components/Decorations';
import './App.css';

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Work />
      <SectionDivider variant="curve" />
      <About />
      <QuoteBand>
        Good design isn&rsquo;t about making things pretty.<br />It&rsquo;s about making things <em>make&nbsp;sense</em>.<br />Human-centered&nbsp;design,&nbsp;always.
      </QuoteBand>
      <Process />
      <SectionDivider variant="wave" />
      <Skills />
      <Contact />
      <Footer />
      <BackToTop />
      <ScrollCat />
    </>
  );
}

export default App;
