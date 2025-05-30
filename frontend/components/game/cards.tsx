import Image from "next/image"

type CardsType = {
    size: string | string[]
    cards: string[]
    theme: string | string[]
    handleClick: (index: number) => void
    flipped: number[]
    solved: number[]
    t: (key: string) => string;

}

export const Cards = ({ size, cards, theme, handleClick, flipped, solved, t }: CardsType) => {
    return (
        <div className="flex justify-center mt-5">
            <div className={`grid ${size === '4x4' ? 'grid-cols-4' : 'grid-cols-4 sm:grid-cols-6'} gap-4 sm:gap-6 md:gap-10`}>
                {cards.map((card, index) => {
                    const isFlipped = flipped.includes(index) || solved.includes(index);
                    return (
                        <button
                            className={`relative flex justify-center items-center text-2xl font-bold text-black ${size === '4x4' ? 'w-14 h-14  md:text-4xl md:w-28 md:h-28'
                                : 'w-11 h-11 sm:w-20 sm:h-20 lg:text-4xl lg:w-28 lg:h-28'} transform cursor-pointer transition-transform duration-200
                                 ${isFlipped ? `rotate-180 ${theme === 'numbers' ? 'bg-orange-500' : 'bg-slate-200'} hover:cursor-default`
                                    : "bg-slate-200"
                                }`}
                            key={index}
                            aria-pressed={isFlipped}
                            aria-label={`t("game_card") ${index + 1}, ${isFlipped ? t("game_card_flipped") : t("game_card_not_flipped")}`}
                            onClick={() => !isFlipped && handleClick(index)}
                        >
                            {isFlipped ? (
                                theme === 'icons' ?
                                    <Image
                                        className="rotate-180"
                                        src={card}
                                        fill
                                        loading="eager"
                                        sizes="(min-width: 640px) 7rem, 5rem"
                                        alt={`card ${index + 1}`}
                                    /> : <p className="rotate-180">{card}</p>
                            ) : (
                                "?"
                            )
                            }
                        </button>
                    )
                })}
            </div >
        </div >
    )
}