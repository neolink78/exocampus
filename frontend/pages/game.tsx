import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"
import { MemoryGame } from "@/components/game"
import { useTranslation } from "next-i18next";
import { getStaticPropsWithTranslations } from '@/hoc/serverSideProps';

export const getStaticProps = getStaticPropsWithTranslations()

export default function Game() {
    const router = useRouter()
    const { theme, players, size } = router.query
    const [resetKey, setResetKey] = useState(0);
    const { t } = useTranslation('common')

    if (!router.isReady) return null;

    const reset = () => {
        setResetKey(prev => prev + 1);
    };

    return (
        <div>
            <header className="pt-10 flex flex-col gap-5 text-sm items-center justify-center sm:pr-10 sm:flex-row sm:justify-end sm:text-lg">
                <button onClick={reset}
                    className="bg-yellow-300 hover:bg-yellow-400 py-1 px-8 border border-yellow-400 rounded-2xl text-center w-fit dark:hover:bg-orange-500 dark:bg-orange-300 dark:text-black dark:border-orange-500">
                    {t("game_restart_button")}
                </button>
                <Link href='/'
                    className="bg-yellow-300 hover:bg-yellow-400 py-1 px-8 border border-yellow-400 rounded-2xl text-center w-fit dark:hover:bg-orange-500 dark:bg-orange-300 dark:text-black dark:border-orange-500">
                    {t("game_settings_button")}
                </Link>
                <Link href='/leaderboard'
                    className="bg-yellow-300 hover:bg-yellow-400 py-1 px-8 border border-yellow-400 rounded-2xl text-center w-fit dark:hover:bg-orange-500 dark:bg-orange-300 dark:text-black dark:border-orange-500">
                    {t("homepage_leaderboard_button")}
                </Link>
            </header>
            <main>
                {theme && players && size &&
                    <MemoryGame
                        key={resetKey}
                        theme={theme as 'numbers' | 'icons'}
                        players={Number(players)}
                        size={size}
                        session={router.asPath}
                        t={t}
                    />}
            </main>
        </div>
    )
}