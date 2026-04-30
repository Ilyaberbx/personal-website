import { useState } from 'react'
import { IntroScreen } from './components/intro-screen'
import { PlainView } from './components/plain-view'
import { World } from './components/world'

type View = 'intro' | 'game' | 'plain'

export default function App() {
  const [view, setView] = useState<View>('intro')

  if (view === 'intro') return <IntroScreen onEnter={(target) => setView(target)} />
  if (view === 'plain') return <PlainView onSwitchView={() => setView('game')} />
  return <World onSwitchView={() => setView('plain')} />
}
