import T from 'prop-types'
import React, { Fragment } from 'react'
import Splitting from 'splitting'
/* eslint-disable react/no-danger */
const FinishScreen = ({ newHigh, onRestart, onReset, result, endReason }) => (
  <div className="info-screen">
    {endReason === 'bomb' ? (
      <div className="results" style={{ borderColor: '#ff4d4d', boxShadow: '0 0 50px rgba(255, 0, 0, 0.5)' }}>
        <h2
          className="celebration"
          style={{ color: '#ff4d4d', textShadow: '0 0 20px #ff0000' }}
          dangerouslySetInnerHTML={{
            __html: Splitting.html({ content: `GAME OVER!` }),
          }}
        />
        <p className="info__text" style={{ marginTop: '1rem', color: '#ffaaaa' }}>You Hit a Bomb!</p>
        <p className="boring-text">Final Score: {result}</p>
      </div>
    ) : (
      <div className="results">
        {newHigh && (
          <Fragment>
            <h2
              className="celebration"
              dangerouslySetInnerHTML={{
                __html: Splitting.html({ content: `New High Score!` }),
              }}
            />

            <h2 className="celebration">{result}</h2>
          </Fragment>
        )}
        {!newHigh && (
          <h2 className="info__text boring-text">{`You Scored ${result}`}</h2>
        )}
      </div>
    )}
    <button onClick={onRestart}>Play Again</button>
    <button onClick={onReset}>Main Menu</button>
  </div>
)

FinishScreen.propTypes = {
  newHigh: T.bool.isRequired,
  onRestart: T.func.isRequired,
  onReset: T.func.isRequired,
  result: T.number.isRequired,
  endReason: T.string,
}

export default FinishScreen