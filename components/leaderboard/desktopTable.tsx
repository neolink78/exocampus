import { GameType } from "@/pages/leaderboard"
import { useTranslation, TFunction } from "next-i18next";
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
    translateTheme: (t: TFunction, theme: string | undefined) => string;
    translateWinners: (t: TFunction, winners: string | undefined) => string;
}

export const DesktopTable = ({ topTen, translateTheme, translateWinners }: TableType) => {
    const { t, i18n } = useTranslation('common')
    return (
        <div className="hidden sm:block overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="border-orange-500">
                        <TableHead></TableHead>
                        <TableHead className="text-center text-dark font-bold">Date</TableHead>
                        <TableHead className="text-center text-dark font-bold">{t("leaderboard_players")}</TableHead>
                        <TableHead className="text-center text-dark font-bold">{t("leaderboard_winners")}</TableHead>
                        <TableHead className="text-center text-dark font-bold">{t("leaderboard_theme")}</TableHead>
                        <TableHead className="text-center text-dark font-bold">{t("leaderboard_winner_score")}</TableHead>
                        <TableHead className="text-center text-dark font-bold">{t("leaderboard_tries")}</TableHead>
                        <TableHead className="text-center text-dark font-bold">{t("leaderboard_time")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(10)].map((_, idx) => {
                        const game = topTen[idx]
                        const date = new Date(game?.date).toLocaleDateString(i18n.language === 'fr' ? "fr-FR" : "en-us")
                        return (
                            <TableRow key={idx} className="border-orange-500 text-center">
                                <TableCell className="font-medium">{idx + 1}</TableCell>
                                <TableCell className="font-medium">{game?.date ? date : '-'}</TableCell>
                                <TableCell className="font-medium">{game?.players || '-'}</TableCell>
                                <TableCell className="font-medium">{translateWinners(t, game?.winners)}</TableCell>
                                <TableCell className="font-medium"> {translateTheme(t, game?.theme)}</TableCell>
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