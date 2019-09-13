import React, {useState, useEffect} from 'react';
import uniq from 'lodash/uniq';
import Spinner from "../Spinner";
import Sound from "../Sound";
import Button from "../Button";

export default function SlotMachine() {
  const [isRunning, setIsRunning] = useState(false);
  const [winner, setWinner] = useState(false);
  const [lose, setLose] = useState(false);
  const [prize, setPrize] = useState(0);

  const MAX_PRIZE = 100;
  const CONSEC_PRIZE = 20;
  const NON_CONSEC_PRIZE = 10;

  useEffect(() => {
    const start = setTimeout(() => {
      handleStart();
    }, 5000);

    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    let stop;
    if (isRunning) {
      stop = setTimeout(() => {
        handleStop()
      },10000);
    }

    return () => clearTimeout(stop);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setWinner(false);
    setPrize(0);
  };

  const handleStop = () => setIsRunning(false);

  const handleResult = wheels => {
    const images = wheels.map(wheel => wheel.split('/').pop());
    const result = uniq(images);

    // if loose.
    if (result.length === 3) {
      setWinner(false);
      setLose(true);
      setPrize(0);
      return;
    }

    // win max prize.
    if (result.length === 1) {
      setWinner(true);
      setLose(false);
      setPrize(MAX_PRIZE);
      return;
    }

    // two consecutive symbols.
    if (images[0] === images[1] || images[1] === images[2]) {
      setWinner(true);
      setLose(false);
      setPrize(CONSEC_PRIZE);
      return;
    }

    setWinner(true);
    setLose(false);
    setPrize(NON_CONSEC_PRIZE);
  };

  return (
    <div className="slot-machine">
      <h1 className="slot-machine-title">React Slot Machine Game</h1>

      <Spinner
        spin={isRunning}
        onStop={handleResult}
      />

      <div className="btn-group">
        <Button handleClick={handleStart} variant="start">Start</Button>
        <Button handleClick={handleStop} variant="stop" disabled={!isRunning}>Stop</Button>
      </div>

      <div className="prize">
        {winner && <p>You win! Your prize: ${prize}.00</p> }

        {(winner && prize === MAX_PRIZE) && <Sound audio="win" /> }

        {lose &&
          <>
            <p>You lose</p>
            <Sound audio="fail" />
          </>
        }
      </div>

      <footer className="footer">
        <a href="https://github.com/davi-94/slotmachine" className="link" target="_blank" rel="noreferrer noopener">
          Github Repository{' '}
          <i className="fa fa-github" aria-hidden="true" />
        </a>
      </footer>
    </div>
  )
}

