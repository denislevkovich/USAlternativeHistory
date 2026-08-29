import './App.css'
import { Timeline } from './components/Timeline'

function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <p className="eyebrow">An interactive American timeline</p>
        <h1>250 Years of American History in Facts and Factoids</h1>
      </header>

      <Timeline />
    </main>
  )
}

export default App
