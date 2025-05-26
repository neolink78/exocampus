import Link from "next/link";
import { Button } from "@/lib/components/ui/Button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"

type GamePreparedType = {
    theme: string,
    players: number,
    size: string
}

type GameSettingsType = {
    gamePrepared: GamePreparedType,
    setGamePrepared: (value: GamePreparedType) => void;
    startGame: () => void;
}

export const GameSettings = ({ gamePrepared, setGamePrepared, startGame }: GameSettingsType) => {
    return (
        <main className="flex justify-center px-4">
            <Card className="w-full max-w-md min-h-[28rem] flex flex-col items-center justify-center dark:bg-[#262626]">
                <CardContent className="flex flex-col items-center gap-2">
                    <p>Select theme</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <Button
                            set={gamePrepared.theme}
                            value="Numbers"
                            onClick={() => gamePrepared.theme !== 'numbers' && setGamePrepared({ ...gamePrepared, theme: 'numbers' })}
                        />
                        <Button
                            set={gamePrepared.theme}
                            value="Icons"
                            onClick={() => gamePrepared.theme !== 'icons' && setGamePrepared({ ...gamePrepared, theme: 'icons' })}
                        />
                    </div>
                </CardContent>
                <CardContent className="flex flex-col items-center gap-2">
                    <p>Number of Players</p>
                    <div className="xs:flex gap-2 grid grid-cols-2">
                        <Button
                            set={gamePrepared.players}
                            value="1"
                            onClick={() => gamePrepared.players !== 1 && setGamePrepared({ ...gamePrepared, players: 1 })}
                        />
                        <Button
                            set={gamePrepared.players}
                            value="2"
                            onClick={() => gamePrepared.players !== 2 && setGamePrepared({ ...gamePrepared, players: 2 })}
                        />
                        <Button
                            set={gamePrepared.players}
                            value="3"
                            onClick={() => gamePrepared.players !== 3 && setGamePrepared({ ...gamePrepared, players: 3 })}
                        />
                        <Button
                            set={gamePrepared.players}
                            value="4"
                            onClick={() => gamePrepared.players !== 4 && setGamePrepared({ ...gamePrepared, players: 4 })}
                        />
                    </div>
                </CardContent>
                <CardContent className="flex flex-col items-center gap-2">
                    <p>Grid Size</p>
                    <div className="flex gap-2">
                        <Button
                            set={gamePrepared.size}
                            value="4x4"
                            onClick={() => gamePrepared.size !== '4x4' && setGamePrepared({ ...gamePrepared, size: '4x4' })}
                        /><Button
                            set={gamePrepared.size}
                            value="6x6"
                            onClick={() => gamePrepared.size !== '6x6' && setGamePrepared({ ...gamePrepared, size: '6x6' })}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-5 ">
                    <button className="bg-yellow-300 hover:bg-yellow-400 dark:hover:bg-orange-500 dark:bg-orange-300 dark:text-black dark:border-orange-500 py-1 px-8 border border-yellow-400 rounded-2xl" onClick={() => startGame()}>Start game</button>
                    <Link href='/leaderboard' className="bg-yellow-300 hover:bg-yellow-400 dark:hover:bg-orange-500 dark:bg-orange-300 dark:text-black dark:border-orange-500 py-1 px-8 border border-yellow-400 rounded-2xl">Leaderboard</Link>
                </CardFooter>
            </Card>

        </main>
    )
}