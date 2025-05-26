import { useState, useEffect, useMemo } from "react"
import { Cards } from "./cards"
import { generateDeck } from "@/hooks/useGenerateDeck"
import { usePlayers } from '@/hooks/usePlayers'
import { useTimer } from "@/hooks/useTimer"
import { Result } from "./result"
import { Players } from "./players"
import * as gameAPi from '@/services/api.service'

type MemoryGameType = {
    theme: 'numbers' | 'icons'
    size: string | string[]
    players: number
    session: string
}

export const MemoryGame = ({ theme, size, players, session }: MemoryGameType) => {
    const { playersCount, incrementTries, incrementPoints, findWinners } = usePlayers(players)

    const [flipped, setFlipped] = useState<number[]>([]);
    const [solved, setSolved] = useState<number[]>([]);
    const [playerTurn, setPlayerTurn] = useState(1)
    const [winners, setWinners] = useState<typeof playersCount | null>(null)
    const [hasStarted, setHasStarted] = useState(false)

    const cards = useMemo(() => generateDeck(theme, size), [theme, size]);
    const gameOver = solved.length === cards.length;
    const { time: timer, formatTime, start } = useTimer(gameOver);

    useEffect(() => {
        if (gameOver) {
            setWinners(findWinners);
        }
    }, [gameOver])

    const sendGame = async () => {
        if (winners) {
            await gameAPi.postGame({
                players,
                winners: winners.length > 1 ? winners.map(p => p.player).join(", ") : winners[0].player,
                theme,
                winner_score: winners[0].points,
                tries: winners[0].tries,
                time: timer
            })
        }
    }
    useEffect(() => {
        if (winners !== null) sendGame()
    }, [winners])

    const checkForMatch = () => {
        const [first, second] = flipped;
        const match = cards[first] === cards[second]
        const willBeSolvedCount = match ? solved.length + 2 : solved.length;
        const isLastMove = willBeSolvedCount === cards.length;

        if (match) {
            setSolved([...solved, ...flipped]);
            incrementPoints(playerTurn - 1)
        }
        setFlipped([]);
        incrementTries(playerTurn - 1)
        if (!isLastMove) setPlayerTurn(prev => playerTurn === players ? 1 : prev + 1)
    };

    useEffect(() => {
        if (flipped.length === 2) {
            setTimeout(() => {
                checkForMatch();
            }, 700);
        }
    }, [flipped]);

    useEffect(() => {
        if (!hasStarted) return
        sessionStorage.setItem('lastGameUrl', session)
    }, [hasStarted])



    const handleClick = (index: number) => {
        if (!hasStarted) {
            start();
            setHasStarted(true);
        }
        if (!flipped.includes(index) && flipped.length < 2) {
            setFlipped([...flipped, index]);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <Result gameOver={gameOver} winners={winners} players={players} timer={timer} formatTime={formatTime} />
            <Cards size={size} cards={cards} theme={theme} handleClick={handleClick} flipped={flipped} solved={solved} />
            <Players players={players} playerTurn={playerTurn} playersCount={playersCount} />
        </div>
    );
}