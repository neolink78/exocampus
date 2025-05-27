import { GameType } from "@/pages/leaderboard"
import { useTranslation, TFunction } from "next-i18next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type TableType = {
    topTen: GameType[]
    translateTheme: (t: TFunction, theme: string | undefined) => string;
    translateWinners: (t: TFunction, winners: string | undefined) => string;
}

export const MobileTable = ({ topTen, translateTheme, translateWinners }: TableType) => {
    const { t, i18n } = useTranslation('common')

    const frenchOrdinal = (num: number) => {
        return num === 1 ? '1ère' : num + 'e'
    }

    const englishOrdinal = (num: number) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = num % 100;
        return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    }

    return (
        <div className="sm:hidden flex justify-center">
            <Accordion type="single" collapsible className="space-y-2 w-full max-w-[21rem]">
                {[...Array(10)].map((_, idx) => {
                    const game = topTen[idx]
                    const date = new Date(game?.date).toLocaleDateString(i18n.language === 'fr' ? "fr-FR" : "en-us")
                    const index = idx + 1
                    const ordinal = i18n.language === 'fr' ? frenchOrdinal(idx + 1) : englishOrdinal(index)

                    if (!game) {
                        return (
                            <h3
                                key={idx}
                                className="border border-orange-300 rounded-lg rounded-lg px-4 py-3 font-bold text-sm cursor-not-allowed"
                            >
                                {t("leaderboard_no_data", { index, ordinal } as Record<string, unknown>)}
                            </h3>
                        )
                    }
                    return (
                        <AccordionItem value={`item-${idx}`} key={idx} className="border border-orange-300 rounded-lg px-4">
                            <AccordionTrigger className="py-3 font-bold">
                                {idx + 1} - Score: {game?.winner_score}
                            </AccordionTrigger>
                            <AccordionContent className="pb-4 text-sm space-y-2">
                                <h3><span className="font-bold">Date : </span>{date}</h3>
                                <h3><span className="font-bold">{t("leaderboard_players")} : </span>{game?.players}</h3>
                                <h3><span className="font-bold">{t("leaderboard_winners")} : </span>{translateWinners(t, game?.winners)}</h3>
                                <h3><span className="font-bold">{t("leaderboard_theme")} : </span>{translateTheme(t, game?.theme)}</h3>
                                <h3><span className="font-bold">{t("leaderboard_winner_score")} : </span>{game?.winner_score}</h3>
                                <h3><span className="font-bold">{t("leaderboard_tries")} : </span>{game?.tries}</h3>
                                <h3><span className="font-bold">{t("leaderboard_time")} : </span>{game?.time}</h3>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    )
}