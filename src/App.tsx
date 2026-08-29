import './App.css'
import { Timeline } from './components/Timeline'

function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <p className="eyebrow">An interactive American timeline</p>
        <h1
          className="title-lockup"
          aria-label="250 Years of American History in Facts and Factoids"
        >
          <span className="title-number" aria-hidden="true">
            250
          </span>
          <span className="title-copy" aria-hidden="true">
            <span>Years of American History</span>
            <span>in Facts and Factoids</span>
          </span>
        </h1>
      </header>

      <Timeline />
    </main>
  )
}

export default App
