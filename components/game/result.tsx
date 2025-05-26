type ResultType = {
    gameOver: boolean
    winners: {
        player: string
        tries: number
        points: number
    }[] | null
    players: number
    timer: number
    formatTime: string
}

export const Result = ({ gameOver, winners, players, timer, formatTime }: ResultType) => {
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
                        <h2 className="text-center">{winners[0].player} wins with {winners[0].points} points. The game took {timer} seconds to be completed!</h2>
                    ) :
                        (
                            <h2 className="text-center">You won with {winners[0].points} points in {timer} seconds!</h2>
                        )
                ) : winners && winners.length > 1 && (
                    <h2 className="text-center">
                        Draw! Winners are: {winners.map(p => p.player).join(", ")} with {winners[0].points} points each. The game took {timer} seconds to be completed!
                    </h2>
                )
                }
            </div>
        </div>
    )
}