import './Game.css'
import Logo from '../../UI/Logo'
import GameHead from './GameHead'
import GameBody from './GameBody'
import GameScore from './GameScore'

const Game = probs=>{
    return <div className='game'>
        <GameHead></GameHead>
        <GameBody></GameBody>
        <GameScore></GameScore>
    </div>
}
export default Game