import { useState } from "react";

export const usePlayers = (players: number) => {
     const playersCounter = Array.from({ length: players }, (_, idx) => ({
        player: `Player ${idx + 1}`,
        tries: 0,
        points: 0
    }))

    const [playersCount, setPlayersCount] = useState(playersCounter);

       const incrementTries = (index: number) => {
        setPlayersCount((prev) =>
            prev.map((p, i) =>
                i === index ? { ...p, tries: p.tries + 1 } : p
            )
        );
    };

    const incrementPoints = (index: number) => {
        setPlayersCount((prev) =>
            prev.map((p, i) =>
                i === index ? { ...p, points: p.points + 1 } : p
            )
        );
    };

     const findWinners = () => {
    const max = Math.max(...playersCount.map(p => p.points));
    return playersCount.filter(p => p.points === max);
  };

  return {
    playersCount,
    incrementTries,
    incrementPoints,
    findWinners
  }

}