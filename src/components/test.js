import React, { useState, useEffect } from 'react';

function PlayersManager() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');

  // Load players from localStorage when component mounts
  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);
  }, []);

  // Save players to localStorage when players state changes
  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  // Add a new player with default alertness
  const addPlayer = () => {
    if (playerName.trim()) {
      setPlayers([
        ...players,
        { id: Date.now(), name: playerName, alertness: 100, intervalId: null },
      ]);
      setPlayerName('');
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
        player.id === id ? { ...player, alertness: player.alertness - 2 } : player
      )
    );
  };

  // Increase alertness manually
  const increaseAlertness = (id) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, alertness: player.alertness + 2 } : player
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
    }, 5000);

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

  return (
    <div>
      <h2>مدیریت بازیکنان</h2>
      <input
        type="text"
        placeholder="نام بازیکن را وارد کنید"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={addPlayer}>افزودن بازیکن</button>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <span>{player.name}</span>
            <span> - هوشیاری: {player.alertness}</span>
            <button onClick={() => removePlayer(player.id)}>حذف بازیکن</button>
            <button onClick={() => decreaseAlertness(player.id)}>
              کاهش هوشیاری
            </button>
            <button onClick={() => increaseAlertness(player.id)}>
              افزایش هوشیاری
            </button>
            <button onClick={() => startAutoDecrease(player.id)}>
              شروع کاهش خودکار
            </button>
            <button onClick={() => stopAutoDecrease(player.id)}>
              توقف کاهش خودکار
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayersManager;