import { useState } from 'react'
import './App.css'
import { Timeline } from './components/Timeline'
import { historyEvents, type HistoryMode } from './data/historyEvents'

function App() {
  const [mode, setMode] = useState<HistoryMode>('real')
  const isAlternative = mode === 'alternative'

  return (
    <main className="app-shell" data-history-mode={mode}>
      <header className="site-header">
        <div className="header-topline">
          <p className="eyebrow">An interactive American timeline</p>
          <button
            type="button"
            className="history-switch"
            role="switch"
            aria-checked={isAlternative}
            onClick={() => setMode(isAlternative ? 'real' : 'alternative')}
          >
            <span className={!isAlternative ? 'is-active' : undefined}>
              Facts
            </span>
            <span className="switch-track" aria-hidden="true">
              <span />
            </span>
            <span className={isAlternative ? 'is-active' : undefined}>
              Factoids
            </span>
          </button>
        </div>
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

      <Timeline key={mode} events={historyEvents[mode]} mode={mode} />
    </main>
  )
}

export default App
