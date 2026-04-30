import { useState } from 'react'
import { IntroScreen } from './components/intro-screen'
import { World } from './components/world'

export default function App() {
  const [started, setStarted] = useState(false)
  if (!started) return <IntroScreen onStart={() => setStarted(true)} />
  return <World />
}
