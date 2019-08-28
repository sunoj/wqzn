import React, { useState, useEffect } from 'react'

function LoadingBar({ isShow }) {

  const [percent, setPercent] = useState(0);
  const [show, setShow] = useState(true);

  useEffect( () => {

    if (percent < 100 ) {
      setTimeout( () => {
        setPercent(percent + Math.random() * 50)
      }, 50)
    } else {
      setPercent(100)
      setTimeout(() => {
        setShow(false)
      }, 300)
    }
  }, [percent])

  return <div className="loading-bar" style={{ width: `${percent}%`, display: `${show ? 'block' : 'none'}`}}></div>
}

export default LoadingBar