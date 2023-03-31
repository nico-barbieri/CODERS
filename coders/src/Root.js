import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { GameContextProvider } from './components/game/utilities/GameContext'

export function Root() {
    return (
        <BrowserRouter>
        <GameContextProvider>
            <App />
        </GameContextProvider>
        </BrowserRouter>
    )
}