import Link from "next/link"
import { useEffect, useState } from "react"
import * as gameAPi from '@/services/api.service'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type GameType = {
    date: string,
    players: number,
    winners: string
    theme: 'numbers' | 'icons'
    winner_score: number,
    tries: number,
    time: number
}

export default function Result() {
    const [topTen, setTopTen] = useState([])
    const [lastGameUrl, setLastGameUrl] = useState<string | null>(null)
    const [stats, setStats] = useState({ average_score: 0, total_games: 0 })


    const getGamesStats = async () => {
        const topTenData = await gameAPi.getTopTen()
        const statsData = await gameAPi.getStats()
        setTopTen(topTenData)
        setStats(statsData)
    }

    console.log(stats)

    useEffect(() => {
        getGamesStats()
        const url = sessionStorage.getItem('lastGameUrl')
        setLastGameUrl(url)
    }, [])

    return (
        <div>
            <header className="py-10 pr-10 flex justify-end gap-5">
                {lastGameUrl && <Link href={lastGameUrl} className="bg-yellow-300 hover:bg-yellow-400 py-1 px-8 border border-yellow-400 rounded-2xl">Replay</Link>}
                <Link href='/' className="bg-yellow-300 hover:bg-yellow-400 py-1 px-8 border border-yellow-400 rounded-2xl">Menu</Link>
            </header>
            <main className="mx-60">
                <h1 className="text-center pb-10">Best of 10</h1>
                <div className="flex justify-between pb-10">
                    <h2>Score on average: {stats?.average_score}</h2>
                    <h2>Total of games: {stats?.total_games}</h2>
                </div>
                <Table>
                    <TableHeader >
                        <TableRow className="border-orange-500">
                            <TableHead></TableHead>
                            <TableHead className="text-center">Date</TableHead>
                            <TableHead className="text-center">players</TableHead>
                            <TableHead className="text-center">Winner(s)</TableHead>
                            <TableHead className="text-center">theme</TableHead>
                            <TableHead className="text-center">winner score</TableHead>
                            <TableHead className="text-center">Tries</TableHead>
                            <TableHead className="text-center">Time (in seconds)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(10)].map((_, idx) => {
                            const game: GameType = topTen[idx]
                            return (
                                <TableRow key={idx} className="border-orange-500 text-center">
                                    <TableCell className="font-medium">{idx + 1}</TableCell>
                                    <TableCell className="font-medium">{game?.date}</TableCell>
                                    <TableCell className="font-medium">{game?.players}</TableCell>
                                    <TableCell className="font-medium">{game?.winners}</TableCell>
                                    <TableCell className="font-medium">{game?.theme}</TableCell>
                                    <TableCell className="font-medium">{game?.winner_score}</TableCell>
                                    <TableCell className="font-medium">{game?.tries}</TableCell>
                                    <TableCell className="font-medium">{game?.time}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </main>
        </div>
    )
}