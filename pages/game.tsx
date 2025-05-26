import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"
import { MemoryGame } from "@/components/game"

export default function Game() {
    const router = useRouter()
    const { theme, players, size } = router.query
    const [resetKey, setResetKey] = useState(0);

    const reset = () => {
        setResetKey(prev => prev + 1);
    };

    return (
        <div>
            <header className="pt-10 flex flex-col gap-5 text-sm items-center justify-center sm:pr-10 sm:flex-row sm:justify-end sm:text-lg">
                <button onClick={reset} className="bg-yellow-300 hover:bg-yellow-400 py-1 px-8 border border-yellow-400 rounded-2xl text-center w-fit dark:hover:bg-orange-500 dark:bg-orange-300 dark:text-black dark:border-orange-500">Restart</button>
                <Link href='/' className="bg-yellow-300 hover:bg-yellow-400 py-1 px-8 border border-yellow-400 rounded-2xl text-center w-fit dark:hover:bg-orange-500 dark:bg-orange-300 dark:text-black dark:border-orange-500">Change settings</Link>
                <Link href='/leaderboard' className="bg-yellow-300 hover:bg-yellow-400 py-1 px-8 border border-yellow-400 rounded-2xl text-center w-fit dark:hover:bg-orange-500 dark:bg-orange-300 dark:text-black dark:border-orange-500">Leaderboard</Link>
            </header>
            <main>
                {theme && players && size &&
                    <MemoryGame
                        key={resetKey}
                        theme={theme as 'numbers' | 'icons'}
                        players={Number(players)}
                        size={size}
                        session={router.asPath}
                    />}
            </main>
        </div>
    )
}