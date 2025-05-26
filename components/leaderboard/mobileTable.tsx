import { GameType } from "@/pages/leaderboard"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type TableType = {
    topTen: GameType[]
}

export const MobileTable = ({ topTen }: TableType) => {
    return (
        <div className="sm:hidden flex justify-center">
            <Accordion type="single" collapsible className="space-y-2 w-full max-w-[21rem]">
                {[...Array(10)].map((_, idx) => {
                    const game = topTen[idx]
                    const date = new Date(game?.date).toLocaleDateString("fr-FR")

                    if (!game) {
                        return (
                            <h3
                                key={idx}
                                className="border border-orange-300 rounded-lg rounded-lg px-4 py-3 font-bold text-sm cursor-not-allowed"
                            >
                                {idx + 1} - There is no {idx + 1}{idx === 0 ? 'st' : idx === 1 ? 'nd' : idx === 2 ? 'rd' : 'th'} game yet !
                            </h3>
                        )
                    }
                    return (
                        <AccordionItem value={`item-${idx}`} key={idx} className="border border-orange-300 rounded-lg px-4">
                            <AccordionTrigger className="py-3 font-bold">
                                {idx + 1} - Score: {game?.winner_score}
                            </AccordionTrigger>
                            <AccordionContent className="pb-4 text-sm space-y-2">
                                <h3><span className="font-bold">Date: </span>{date}</h3>
                                <h3><span className="font-bold">Players: </span>{game?.players}</h3>
                                <h3><span className="font-bold">Winner(s): </span>{game?.winners}</h3>
                                <h3><span className="font-bold">Theme: </span>{game?.theme}</h3>
                                <h3><span className="font-bold">Winner Score: </span>{game?.winner_score}</h3>
                                <h3><span className="font-bold">Tries: </span>{game?.tries}</h3>
                                <h3><span className="font-bold">Time (s): </span>{game?.time}</h3>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    )
}