import React, { useState, useEffect , useRef } from 'react';
// import AdminPanel from '../css/Adminpanel.css'
import './adminPageStyle.css'

// bug
function AdminPanel() {

  const [time, setTime] = useState(() => {
    // بارگذاری زمان از لوکال استوریج یا شروع از 80 دقیقه
    const savedTime = localStorage.getItem('timerTest');
    return savedTime ? parseInt(savedTime, 10) : 100 * 60 + 4;
  });

  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerImg, setPlayerImg] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const [refresh , setrefresh] = useState(false)
  const [numberOfHearts, setNumberOfHearts] = useState(3); 
  const [finishGame , setFinishGame] = useState(false)
  const [isGameEnd, setIsGameEnd] = useState(() => {
    const savedStatus = localStorage.getItem('isEndGame');
    return savedStatus ? JSON.parse(savedStatus) : null;
  });
  const [isHere , setIsHere] = useState(false)

  // const [result , setResult] = useState(false)

  
  
  useEffect(() => {
    localStorage.setItem('isEndGame', JSON.stringify(isGameEnd));
  }, [isGameEnd]);



  useEffect(() => {
    localStorage.setItem('timerTest', time);
  }, [time]);

  // Save players to localStorage when players state changes
  
  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);
  }, []);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

      // اجرای تایمر
      useEffect(() => {
        if (isRunning) {
        timerRef.current = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);
        }
            // پاکسازی تایمر هنگام توقف یا پایان تایمر
            return () => clearInterval(timerRef.current);
    }, [isRunning]);


    useEffect(() => {
      if (time <= 0) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      }
  }, [time]);

  useEffect(() => {
    localStorage.setItem('refresh', refresh);
    // localStorage.setItem('end game', finishGame);
    localStorage.setItem('heart',numberOfHearts);
    // localStorage.setItem('result',result);
    localStorage.setItem('isHere',isHere);
    if (localStorage.getItem('timer') == '0' || localStorage.getItem('timer') == 0) {
      // console.log('game over');
      setTimeout(()=>{
        setrefresh(true)
        
      },1000)
      console.log(refresh);
      setTimeout(()=>{
        setrefresh(false)
        
      },2000)
      console.log(refresh);
      // handlminuseAge()
    }
    
  }, [players, time]);

  const startTimer = () => {
    setIsRunning(true);
        setTimeout(()=>{
      setrefresh(true)
      
    },1000)
    console.log(refresh);
    setTimeout(()=>{
      setrefresh(false)
      
    },2000)
    console.log(refresh);
    // handlminuseAge()
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
;
  };
  
  const finalTime =()=>{
    if (time) {
    localStorage.setItem('timerTest', time);
    setTime(time *60 + 4)
    }
  }

  // Add a new player with default alertness
  const addPlayer = () => {
    if (playerName.trim() && playerImg) {
      setPlayers([
        ...players,
        { id: Date.now(), name: playerName, alertness: 100, intervalId: null , img:`image/${playerImg}.png`},
      ]);
      setPlayerName('');
      setPlayerImg(1)
    }
  };
  

  // Remove a player
  const removePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };


  // Decrease alertness manually
  const decreaseAlertness = (id) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, alertness: player.alertness - 1 } : player
      )
    );
  };

    // Increase alertness manually
    const increaseAlertness = (id) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === id ? { ...player, alertness: player.alertness + 1 } : player
        )
      );
    };

  
  // Start auto-decrease alertness every minute
  const startAutoDecrease = (id) => {
    console.log('click on startAutoDecrease')
    const intervalId = setInterval(() => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === id ? { ...player, alertness: player.alertness - 2 } : player
        )
      );
      // for update display
      
      
   
    }, 60000);
    
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, intervalId } : player
  )
);
  };

    // Stop auto-decrease alertness
    const stopAutoDecrease = (id) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.id === id && player.intervalId) {
            clearInterval(player.intervalId);
            return { ...player, intervalId: null };
          }
          return player;
        })
      );
    };

  const clearLocalStorage = () =>{
    setTimeout(()=>{  
      localStorage.clear()
      updateAll()
      refreshMainPage()
    },1000)
    
    setTimeout(()=>{
      window.location.reload()
      localStorage.clear()
      updateAll()
      refreshMainPage()
    },2000)
    
    
    // setTimeout(()=>{
    //   // localStorage.clear()
    //   updateAll()
    // },3000)

    
  }

  const updateAll = () =>{

   
    setrefresh(true)

      setTimeout(()=>{
        
        setrefresh(false)

      },1000)

  }


  const decrementHeart =()=>{
    setNumberOfHearts(prev =>{
      if (prev > 0) {
        
        return prev -1
      }else{
        return 0
      }
    })
  }
  
  const increaseHeart =()=>{
    setNumberOfHearts(prev =>{
      if (prev < 3) {
        
        return prev +1
      }else{
        return 3
      }
    })

  }

  const refreshMainPage=()=>{
    localStorage.setItem('refresh' , true)

    setTimeout(()=>{
      localStorage.setItem('refresh' , false)

    },2000)
  }  



  const changeIsHere = ()=>{
    setIsHere(prev => !prev)

  }

  const openLoseModal = () =>{
      
    setFinishGame(false)
  }
  const openWinModal = () =>{
    setFinishGame(true)
  }
     
    return ( 
        <>
        <div className='admin-page'>
        <h1 className='title'>Admin Panel</h1>
            <div className='inputs-contaner'>
            <input
        type="text"
        placeholder="Enter player name"
        value={playerName}
        className='input-admin'
        onChange={(e) => setPlayerName(e.target.value)}
      />
            <input
        type="number"
        placeholder="Enter avatar"
        value={playerImg}
        className='input-admin'

        onChange={(e) => setPlayerImg(e.target.value)}
      />
      <input
       type="number" 
       placeholder="Enter Time just enter" 
       className='input-admin'
       onChange={(e) => setTime(e.target.value * 60 + 4)} />
      <button className='btn-input' onClick={addPlayer}>Add user</button>
            </div>
                {/* <button onClick={finalTime}>تعیین زمان</button> */}
            <div>

            </div>

            <h3 className='title'>Players List</h3>
            <ul className='players-list'>
        {players.map((player , index) => (
          <li className='player-continer' key={player.id}>
            <span className='player-name' >{++index} - {player.name}</span>
            <span className='player-sanity'> sanity : {player.alertness}</span>
            <button className='player-btn' onClick={() => decreaseAlertness(player.id)}>
              کاهش هوشیاری
            </button>
            <button className='player-btn' onClick={() => increaseAlertness(player.id)}>
              افزایش هوشیاری
            </button>
            <button className='player-btn' onClick={() => startAutoDecrease(player.id)}>
              شروع کاهش خودکار
            </button>
            <button className='player-btn' onClick={() => stopAutoDecrease(player.id)}>
              توقف کاهش خودکار
            </button>
            <button className='player-btn' onClick={() => removePlayer(player.id)}>حذف بازیکن</button>

            
          </li>
        ))}
      </ul>
              {/* <br /><hr /><br /> */}

              <h3 className='title'>Anothr Option</h3>
              <div className='another-function'>

                  <span id='place'>In Place : {isHere ? ' HERE' : ' NOT HERE'}</span> 

                  <div id='timer'>{Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}</div>


                  <span id='hp'>HP : {numberOfHearts}</span> 
              </div>

              <div className="another-btn">

                <div className="another-btn-top">

                  <button className='another-btn-btn' onClick={startTimer} disabled={isRunning || time <= 0}>شروع بازی</button>
                  <button className='another-btn-btn'  onClick={stopTimer } disabled={!isRunning}>توقف بازی</button>
                  <button  className='another-btn-btn' onClick={changeIsHere}>تغیر وضعیت</button>
                  <button className='another-btn-btn' onClick={updateAll}>بروزرسانی</button>
                </div>

                <div className="another-btn-bottom">
                  <button className='another-btn-btn' onClick={decrementHeart}>کاهش جون</button>
                  <button className='another-btn-btn' onClick={increaseHeart}>افزایش جون</button>
                  <button className='another-btn-btn' onClick={refreshMainPage}>رفرش صفحه اصلی</button>
                  <button  className='another-btn-btn' onClick={clearLocalStorage}>پاکسازی</button>

                </div>
                <div className="another-btn-bottom">
                  <button className='another-btn-btn' onClick={() => setIsGameEnd(false)}>شکست</button>
                  <button className='another-btn-btn' onClick={() => setIsGameEnd(true)}>پیروزی</button>

                </div>
                
              </div>
            {/* <button onClick={decrementTemperature}>کاهش دما</button>
            <button onClick={increaseTemperature}>افزایش دما</button> */}
        </div>



        
        {/* <div>
          <input type="range" step="5"  defaultValue='25' style={{cursor:'pointer', width : 400, padding: 20 }} id="volume" name="volume" min="-30" max="80" onChange={(event)=>{
            console.log(event.target.value)
            setTemperature(event.target.value)
            console.log('temperature',temperature);
          }} />
          <label for="volume">Volume</label>
          <h5>temperature : {temperature}</h5>
      </div> */}

        </>
     );
}

export default AdminPanel;