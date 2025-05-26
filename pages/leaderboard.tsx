import { useEffect, useState } from "react"
import * as gameAPi from '@/services/api.service'
import { Results } from "@/components/leaderboard"
import { Header } from "@/components/leaderboard/header"

export type GameType = {
    date: string,
    players: number,
    winners: string
    theme: 'numbers' | 'icons'
    winner_score: number,
    tries: number,
    time: number
}

export default function Leaderboard() {
    const [topTen, setTopTen] = useState<GameType[]>([])
    const [lastGameUrl, setLastGameUrl] = useState<string | null>(null)
    const [stats, setStats] = useState({ average_score: 0, total_games: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const topTenData = await gameAPi.getTopTen()
            const statsData = await gameAPi.getStats()
            setTopTen(topTenData)
            setStats(statsData)
            setLoading(false)
        }
        fetchData()
        const url = sessionStorage.getItem('lastGameUrl')
        setLastGameUrl(url)
    }, [])

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-6">
            <Header lastGameUrl={lastGameUrl} />
            <Results topTen={topTen} loading={loading} stats={stats} />
        </div>
    )
}
