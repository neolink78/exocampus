import { FrenchFlagIcon } from "@/lib/icons/frenchFlag";
import { Sun } from "@/lib/icons/sun";
import { EnglishFlagIcon } from "@/lib/icons/ukFlag";
import { Moon } from "@/lib/icons/moon";
import type { Dispatch, SetStateAction } from 'react'

type UtilitiesTypes = {
    i18n: {
        language: string
    },
    changeLanguage: (lang: string) => Promise<void> | void
    resolvedTheme: string | undefined
    setTheme: Dispatch<SetStateAction<string>>
    t: (key: string) => string;
}

export const Utilities = ({ t, i18n, changeLanguage, resolvedTheme, setTheme }: UtilitiesTypes) => {

    return (

        <div className="flex justify-end gap-5 pt-5 pr-5 items-center">
            <button
                type="button"
                aria-label="Changer en Français"
                onClick={() => i18n.language === 'en' && changeLanguage('fr')}
            >
                <FrenchFlagIcon className="w-5 h-5 hover:cursor-pointer" />
            </button>
            <button
                type="button"
                aria-label="Switch to English"
                onClick={() => i18n.language === 'fr' && changeLanguage('en')}
            >
                <EnglishFlagIcon className="w-5 h-5 hover:cursor-pointer" />
            </button>
            {resolvedTheme === 'dark' ?
                <button
                    type="button"
                    aria-label={t("layout_light_mode")}
                    onClick={() => setTheme('light')}>
                    <Sun
                        className={`w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] p-1 bg-orange-500 rounded-md hover:bg-orange-400 hover:cursor-pointer stroke-white hover:stroke-black transition-colors duration-300`}
                    />
                </button>
                :
                <button
                    type="button"
                    aria-label={t("layout_dark_mode")}
                    onClick={() => setTheme('dark')}>
                    <Moon
                        className={`w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] p-1 bg-black rounded-md hover:cursor-pointer fill-white hover:fill-orange-500 transition-colors duration-300`}
                    />
                </button>
            }
        </div>
    )
}