import { 
  HomePage, 
  SummarizerPage,
  AboutPage,
  TeamPage,
  TeamReachOutPage
} from "./components" 

function App() {

  return (
    <div className="w-screen md:h-screen divide-y-2 divide-coffee-text md:overflow-x-scroll scroll-smooth md:divide-x-4 md:divide-black relative  flex flex-col md:flex-row md:overflow-y-hidden">
      <section id='home'>
        <HomePage />
      </section>

      <section id="summarizer">
        <SummarizerPage/>
      </section>  

      <section id="about">
        <AboutPage />
      </section>

      <section id="team">
        <TeamPage/>
      </section>

      <section>
        <TeamReachOutPage/>
      </section>
    </div>
  )
}

export default App
