import { useTheme } from "next-themes";
import { FrenchFlagIcon } from "@/lib/icons/frenchFlag";
import { Sun } from "@/lib/icons/sun";
import { EnglishFlagIcon } from "@/lib/icons/ukFlag";
import { Moon } from "@/lib/icons/moon";

type LayoutType = {
    children: React.ReactNode
}

export const Layout = ({ children }: LayoutType) => {
    const { resolvedTheme, setTheme } = useTheme()
    return (
        <div className={`min-h-screen ${resolvedTheme === 'light' ? 'bg-gradient-to-r from-[#FFE6C9] to-[#FFD0A3]' : 'bg-[#0f0f0f]'}`} >
            <div className="flex justify-end gap-5 pt-5 pr-5 items-center">
                <div
                //onClick={() => changeLanguage('fr')}
                >
                    <FrenchFlagIcon className="w-5 h-5 hover:cursor-pointer" />
                </div>
                <div
                //onClick={() => changeLanguage('en')}
                >
                    <EnglishFlagIcon className="w-5 h-5 hover:cursor-pointer" />
                </div>
                {resolvedTheme === 'dark' ?
                    <div onClick={() => setTheme('light')}>
                        <Sun
                            className={`w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] p-1 bg-orange-500 rounded-md hover:bg-orange-400 hover:cursor-pointer stroke-white hover:stroke-black transition-colors duration-300`}
                        />
                    </div>
                    :
                    <div onClick={() => setTheme('dark')}>
                        <Moon
                            className={`w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] p-1 bg-black rounded-md hover:cursor-pointer fill-white hover:fill-orange-500 transition-colors duration-300`}
                        />
                    </div>
                }
            </div>
            {children}
        </div>
    )
}