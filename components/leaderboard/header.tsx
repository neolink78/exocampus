import Link from "next/link"
import { useTranslation } from "next-i18next";

type HeaderType = {
    lastGameUrl: string | null
}

export const Header = ({ lastGameUrl }: HeaderType) => {
    const { t } = useTranslation('common')
    return (
        <header className="flex flex-col sm:flex-row items-center sm:justify-end gap-4 mb-10 sm:mb-20 ">
            {lastGameUrl && (
                <Link href={lastGameUrl} className="bg-yellow-300 hover:bg-yellow-400 py-1 px-6 border border-yellow-400 rounded-2xl text-center dark:hover:bg-orange-500 dark:bg-orange-300 dark:text-black dark:border-orange-500">
                    {t("leaderboard_replay")}
                </Link>
            )}
            <Link href="/" className="bg-yellow-300 hover:bg-yellow-400 py-1 px-6 border border-yellow-400 rounded-2xl text-center dark:hover:bg-orange-500 dark:bg-orange-300 dark:text-black dark:border-orange-500">
                Menu
            </Link>
        </header>
    )
}