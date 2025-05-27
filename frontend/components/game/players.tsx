type PlayersType = {
    players: number
    playerTurn: number
    t: (key: string) => string;
    playersCount: {
        player: string
        tries: number
        points: number
    }[]
}

export const Players = ({ players, playerTurn, playersCount, t }: PlayersType) => {
    return (
        <div className={`${players > 1 ? 'grid grid-cols-2' : 'flex'} sm:flex justify-center gap-5 my-10`} >
            {Array.from({ length: players }).map((_, idx) => {
                const isSelected = idx + 1
                return (
                    <div key={idx} className={`${playerTurn === isSelected ? 'bg-[#6397c6] dark:bg-orange-500' : 'bg-blue-200 dark:bg-orange-300'} dark:text-black rounded-xl text-center`}>
                        {players > 1 && <h1 className="border-b border-black mx-4 py-2 rounded-t-xl text-center" >{t("game_player")}{idx + 1}</h1>}
                        <div className={`${players > 1 ? 'rounded-b-xl py-1' : 'px-3 py-2 rounded-xl flex gap-2 justify-center items-center'}`} >
                            <h3 className={`${players > 1 ? 'pt-2' : ''}`} >{t("game_tries")}</h3>
                            <h3>{playersCount[idx].tries}</h3>
                            <h3 className={`${players > 1 ? 'pt-2' : ''}`} >{t("game_points")}</h3>
                            <h3>{playersCount[idx].points}</h3>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}