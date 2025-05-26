import { Skeleton } from "@/components/ui/skeleton"
import { DesktopTable } from "./desktopTable"
import { MobileTable } from "./mobileTable"
import { GameType } from "@/pages/leaderboard"

type ResultsType = {
    loading: boolean
    stats: {
        average_score: number
        total_games: number
    }
    topTen: GameType[]
}

export const Results = ({ loading, stats, topTen }: ResultsType) => {
    return (
        <main>
            {loading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, idx) => (
                        <Skeleton key={idx} className="h-10 w-full rounded-lg" />
                    ))}
                </div>) : (
                <>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm sm:text-base mb-5">
                        <h2 className="font-semibold">Score on average: {Math.round(stats?.average_score * 100) / 100}</h2>
                        <h1 className="hidden sm:block text-xl font-bold">Best of 10</h1>
                        <h2 className="font-semibold">Total of games: {stats?.total_games}</h2>
                        <h1 className="sm:hidden block text-xl font-bold">Best of 10</h1>
                    </div>
                    <DesktopTable topTen={topTen} />
                    <MobileTable topTen={topTen} />
                </>
            )
            }
        </main>
    )
}