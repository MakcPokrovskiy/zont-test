import React, {useEffect, useRef, useState} from "react";

//components
import ReturnInfoServer from "./Components/ReturnInfoServer";

//styles
import './App.scss';

function App() {
  const [infoData, setInfoData] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);


  const URL = 'https://lk.zont-online.ru/api/button_count';
  const INTERVAL_TIME = 1000;


  const handleInc = () => {
    if (loading) {
      return;
    }
    setCount(prevCount => prevCount + 1);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(sendRequest, INTERVAL_TIME)
  }

  const sendRequest = () => {
    setLoading(true);
    try {
      fetch(URL,
        {
          method: 'POST',
          body: JSON.stringify({count: count}),
          headers: {
            'Content-Type': 'application/json',
            'X-ZONT-Client': "macuumka91@mail.ru",
          }
        })
        .then(res => res.json())
        .then(data => {
          setInfoData(data)
          // console.log(data);
        })
    } catch (error) {
      console.log(error)
    }
    console.log(`Количество кликов: ${count}`);
    setLoading(false);
    timer.current = null;
  }


  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(sendRequest, INTERVAL_TIME);
  }, [count]);


  return (
    <div className="App">
      <div className="wrapper-application">
        <form className="form" action="https://lk.zont-online.ru/api/button_count">
          <input className={`btn ${loading ? 'disabled' : ''}`}
                 type="button" value="КЛИКНУТЬ"
                 onClick={handleInc} disabled={loading}/>
        </form>
        <p className="click-info">Кликнули {count} раз</p>
        <ReturnInfoServer infoData={infoData}/>
      </div>
    </div>
  )
}

export default App;
