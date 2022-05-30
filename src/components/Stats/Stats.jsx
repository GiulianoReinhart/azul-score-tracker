import {StyledStats} from './Stats.styled'
import {motion, AnimatePresence} from 'framer-motion'

const Stats = props => {
  return (
    <StyledStats>
      <AnimatePresence initial={false} exitBeforeEnter>
        {!props.gameEnd ? (
          <motion.div
            key="during-game"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <div>
              <p>Round Points</p>
              <strong>
                {props.roundPoints + props.minusPoints < 0
                  ? 0
                  : props.roundPoints + props.minusPoints}
              </strong>
            </div>
            <div>
              <p>Current Round</p>
              <strong>{props.currentRound}</strong>
            </div>
            <div className="double-size">
              <p>Total Points</p>
              <strong>{props.totalPoints}</strong>
            </div>
            <button onClick={props.incrementRound}>Next round</button>
            <button onClick={props.endGame}>Finish game</button>
          </motion.div>
        ) : (
          <motion.div
            key="after-game"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <div>
              <p>Row Bonus</p>
              <strong>{props.fullRows * 2}</strong>
            </div>
            <div>
              <p>Column Bonus</p>
              <strong>{props.fullColumns * 7}</strong>
            </div>
            <div>
              <p>Colour Bonus</p>
              <strong>{props.fullColours * 10}</strong>
            </div>
            <div>
              <p>Round Points</p>
              <strong>
                {props.totalPoints -
                  props.fullRows * 2 -
                  props.fullColumns * 7 -
                  props.fullColours * 10}
              </strong>
            </div>
            <div className="double-size">
              <p>Total points</p>
              <strong>{props.totalPoints}</strong>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledStats>
  )
}

export default Stats
