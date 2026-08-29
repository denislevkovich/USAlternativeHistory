import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <p className="eyebrow">An interactive American timeline</p>
        <h1>Alternative History of the United States</h1>
      </header>

      <section className="workspace" aria-labelledby="workspace-title">
        <div>
          <p className="section-label">Timeline</p>
          <h2 id="workspace-title">History has more than one path.</h2>
          <p>
            Explore the events that shaped the United States—and the moments
            when the story might have unfolded differently.
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
