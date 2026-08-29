import './App.css'
import { Timeline } from './components/Timeline'

function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <p className="eyebrow">An interactive American timeline</p>
        <h1>Alternative History of the United States</h1>
      </header>

      <Timeline />
    </main>
  )
}

export default App
