import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/lib/components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter()

  const [theme, setTheme] = useState('numbers')
  const [players, setPlayers] = useState(1)
  const [size, setSize] = useState('4x4')

  const startGame = () => {
    router.push(`/game?theme=${theme}&players=${players}&size=${size}`)
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-[#FFE6C9] to-[#FFD0A3]'>
      <header className='justify-center text-2xl py-10 flex' >
        Memory
      </header>
      <main className="flex justify-center">

        <Card className="w-fit flex flex-col items-center">
          <CardContent className="flex flex-col items-center gap-2">
            <p>Select theme</p>
            <div className="flex gap-2">
              <Button
                set={theme}
                value="Numbers"
                onClick={() => theme !== 'numbers' && setTheme('numbers')}
              />
              <Button
                set={theme}
                value="Icons"
                onClick={() => theme !== 'icons' && setTheme('icons')}
              />
            </div>
          </CardContent>
          <CardContent className="flex flex-col items-center gap-2">
            <p>Number of Players</p>
            <div className="flex gap-2">
              <Button
                set={players}
                value="1"
                onClick={() => players !== 1 && setPlayers(1)}
              />
              <Button
                set={players}
                value="2"
                onClick={() => players !== 2 && setPlayers(2)}
              />
              <Button
                set={players}
                value="3"
                onClick={() => players !== 3 && setPlayers(3)}
              />
              <Button
                set={players}
                value="4"
                onClick={() => players !== 4 && setPlayers(4)}
              />
            </div>
          </CardContent>
          <CardContent className="flex flex-col items-center gap-2">
            <p>Grid Size</p>
            <div className="flex gap-2">
              <Button
                set={size}
                value="4x4"
                onClick={() => size !== '4x4' && setSize('4x4')}
              /><Button
                set={size}
                value="6x6"
                onClick={() => size !== '6x6' && setSize('6x6')}
              />
            </div>
          </CardContent>
          <CardFooter>
            <button className="bg-yellow-300 hover:bg-yellow-400 py-1 px-8 border rounded-2xl" onClick={() => startGame()}>Start game</button>
          </CardFooter>
        </Card>

      </main>
    </div>
  );
}
