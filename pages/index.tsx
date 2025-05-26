import { useState } from "react";
import { useRouter } from "next/router";
import { GameSettings } from "@/components/index/gameSettings";

export default function Home() {

  const router = useRouter()
  const [gamePrepared, setGamePrepared] = useState({
    theme: 'numbers',
    players: 1,
    size: '4x4'
  })

  const startGame = () => {
    router.push(`/game?theme=${gamePrepared.theme}&players=${gamePrepared.players}&size=${gamePrepared.size}`)
  }

  return (
    <div className="pb-10">
      <header className='text-xl sm:text-2xl py-6 sm:py-10 text-center' >
        Memory
      </header>
      <GameSettings gamePrepared={gamePrepared} setGamePrepared={setGamePrepared} startGame={startGame} />
    </div>
  );
}
