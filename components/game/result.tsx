import { useTranslation } from "next-i18next";

type ResultType = {
    gameOver: boolean
    winners: {
        player: string
        playerId: number
        tries: number
        points: number
    }[] | null
    players: number
    timer: number
    formatTime: string
}

export const Result = ({ gameOver, winners, players, timer, formatTime }: ResultType) => {
    const { t } = useTranslation('common')
    return (
        <div className="flex flex-col items-center">
            <h2 className="bg-yellow-300 py-1 px-8 rounded-2xl w-fit dark:bg-orange-300 dark:text-black">{formatTime}</h2>
            <div className={`
                min-h-[5rem] sm:min-h-[4rem] px-5 py-5
                text-center transition-opacity duration-300
                ${gameOver ? 'opacity-100' : 'opacity-0'}
            `}>
                {gameOver && winners && winners.length === 1 ? (
                    players > 1 ? (
                        <h2 className="text-center">
                            {t("multiplayer_win", {
                                playerId: winners[0].playerId,
                                points: winners[0].points,
                                seconds: timer
                            })}
                        </h2>
                    ) : (
                        <h2 className="text-center">
                            {t("singleplayer_win", {
                                points: winners[0].points,
                                seconds: timer
                            })}
                        </h2>
                    )
                ) : winners && winners.length > 1 && (
                    <h2 className="text-center">
                        {t("draw_message", {
                            winners: winners.map(p => p.playerId).join(`, ${t("game_player_lower")}`),
                            points: winners[0].points,
                            seconds: timer
                        })}
                    </h2>
                )}
            </div>
        </div>
    )
}