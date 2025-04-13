import React, { useState, useEffect } from 'react';
import './displayPage.css'
// import './circle.scss'
import './circle.css'

function DisplayPage() {

    // const [users, setUsers] = useState([]);
    const [players, setPlayers] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const [numberOfHearts, setNumberOfHearts] = useState(3); 

    const [timer, setTimer] = useState(0 * 60);
    const [isHere, setIsHere] = useState(false);
    const [isGameEnd, setIsGameEnd] = useState(() => {
      const savedStatus = localStorage.getItem('isEndGame');
      return savedStatus ? JSON.parse(savedStatus) : null;
    });

    
    // const [temperature , setTemperature] = useState(24)




    if ( localStorage.getItem('refresh') == 'true') {
      setTimeout(()=>{
        console.log('relode');
        
        window.location.reload()
      },1000)
    }

    useEffect(() => {
        const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
        const savedTimer = parseInt(localStorage.getItem('timerTest'), 10) || 0 * 60;
        const savedIsHere =localStorage.getItem('isHere');
        const savedHP =localStorage.getItem('heart');
        const savedEndGame =localStorage.getItem('isEndGame');
        
        // const savedTemperature = localStorage.getItem('temperature')
        // setUsers(savedUsers);
        setPlayers(savedPlayers);
        setTimer(savedTimer);
        setIsHere(savedIsHere)
        setNumberOfHearts(savedHP)
        setIsGameEnd(savedEndGame)
        // setTemperature(savedTemperature)
      }, []);
      
      useEffect(() => {

        const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
        setPlayers(savedPlayers);


        const savedIsHere =localStorage.getItem('isHere');
        setIsHere(savedIsHere)
        
        const savedHP =localStorage.getItem('heart');
        setNumberOfHearts(savedHP)

        const timerInterval = setInterval(() => {
          setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);
        return () => clearInterval(timerInterval);
      }, [timer]);

      
      
    return ( 
        <>
            <div className='display'>
              <header className='header'>
              <div className='logo'>
                  phasmophobia
                </div>
                <div className='timer-box'>
                  <div className='timer-number'>{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</div>
                </div>
                <div className='status'>

                  <span className="status-text">Warning</span>
                  <div className={isHere =='true' ? 'status-circle-false' : 'status-circle-true'}></div>
              

                </div>

                
               
              </header>
                <div className="HP">
                  {Array(Number(numberOfHearts)).fill('*').map((item)=>(
                      
                      
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlSpace="preserve"
                              id="Layer_1"
                              width="50"
                              height="50"
                              fill="#000"
                              version="1.1"
                              viewBox="0 0 512 512"
                            >
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  fill="#FF6647"
                                  d="M474.655 74.503C449.169 45.72 413.943 29.87 375.467 29.87c-30.225 0-58.5 12.299-81.767 35.566-15.522 15.523-28.33 35.26-37.699 57.931-9.371-22.671-22.177-42.407-37.699-57.931-23.267-23.267-51.542-35.566-81.767-35.566-38.477 0-73.702 15.851-99.188 44.634C13.612 101.305 0 137.911 0 174.936c0 44.458 13.452 88.335 39.981 130.418 21.009 33.324 50.227 65.585 86.845 95.889 62.046 51.348 123.114 78.995 125.683 80.146a8.6 8.6 0 0 0 6.981 0c2.57-1.151 63.637-28.798 125.683-80.146 36.618-30.304 65.836-62.565 86.845-95.889C498.548 263.271 512 219.394 512 174.936c0-37.025-13.612-73.631-37.345-100.433"
                                ></path>
                                <path
                                  fill="#E35336"
                                  d="M160.959 401.243c-36.618-30.304-65.836-62.565-86.845-95.889-26.529-42.083-39.981-85.961-39.981-130.418 0-37.025 13.612-73.631 37.345-100.433 21.44-24.213 49.775-39.271 81.138-43.443a109 109 0 0 0-16.082-1.189c-38.477 0-73.702 15.851-99.188 44.634C13.612 101.305 0 137.911 0 174.936c0 44.458 13.452 88.335 39.981 130.418 21.009 33.324 50.227 65.585 86.845 95.889 62.046 51.348 123.114 78.995 125.683 80.146a8.6 8.6 0 0 0 6.981 0c.689-.308 5.586-2.524 13.577-6.588-21.813-11.092-66.696-35.976-112.108-73.558"
                                ></path>
                              </g>
                          </svg>
                      
                  ))}

                </div>

                <div className='player-continer-display'>
                  {players.map((user, index) => (
                    // <li key={index}>{user.name} - هوشیاری: {user.alertness >= 0 ? user.alertness : 0}</li>

                    <div className="box-player-dispaly">
                      <span className='player-dispaly-perecent'>{user.alertness >=0 ? user.alertness : 0 }%</span>
                      <div className={`green c100 big p${user.alertness}`}>
                          <span id='span-in-circle'><img className='player-dispaly-img' src={user.img} alt="" /></span>
                          <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                          </div>
                      </div>
                        {/* <img className='player-dispaly-img' src={user.img} alt="" /> */}
                      <span className='player-dispaly-name'>{user.name}</span>
                      

                    </div>

                    ))}

                </div>
               

               {
                isGameEnd == 'true' && 
                <div className="win">__Mission completed__</div>
               }
               {
                isGameEnd == 'false' && 
                <div className="lose">__Game Over__</div>
               }

              
                
            </div>
        </>
     );
}

export default DisplayPage;