import { GameType } from "@/pages/leaderboard"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type TableType = {
    topTen: GameType[]
}

export const DesktopTable = ({ topTen }: TableType) => {
    return (
        <div className="hidden sm:block overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="border-orange-500">
                        <TableHead></TableHead>
                        <TableHead className="text-center text-dark font-bold">Date</TableHead>
                        <TableHead className="text-center text-dark font-bold">Players</TableHead>
                        <TableHead className="text-center text-dark font-bold">Winner(s)</TableHead>
                        <TableHead className="text-center text-dark font-bold">Theme</TableHead>
                        <TableHead className="text-center text-dark font-bold">Winner Score</TableHead>
                        <TableHead className="text-center text-dark font-bold">Tries</TableHead>
                        <TableHead className="text-center text-dark font-bold">Time (s)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(10)].map((_, idx) => {
                        const game = topTen[idx]
                        const date = new Date(game?.date).toLocaleDateString("fr-FR")
                        return (
                            <TableRow key={idx} className="border-orange-500 text-center">
                                <TableCell className="font-medium">{idx + 1}</TableCell>
                                <TableCell className="font-medium">{game?.date ? date : '-'}</TableCell>
                                <TableCell className="font-medium">{game?.players || '-'}</TableCell>
                                <TableCell className="font-medium">{game?.winners || '-'}</TableCell>
                                <TableCell className="font-medium">{game?.theme || '-'}</TableCell>
                                <TableCell className="font-medium">{game?.winner_score || '-'}</TableCell>
                                <TableCell className="font-medium">{game?.tries || '-'}</TableCell>
                                <TableCell className="font-medium">{game?.time || '-'}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}