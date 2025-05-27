import { useTheme } from "next-themes";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Utilities } from "./utilities";

type LayoutType = {
    children: React.ReactNode
}

export const Layout = ({ children }: LayoutType) => {
    const { resolvedTheme, setTheme } = useTheme()
    const { t, i18n } = useTranslation('common')
    const router = useRouter()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const changeLanguage = (lang: string) => {
        if (lang === i18n.language) return
        i18n.changeLanguage(lang)
        router.push({
            pathname: router.pathname,
            query: router.query,
        }, undefined, { locale: lang })
    }

    return (
        <div className={`min-h-screen ${resolvedTheme === 'light' && 'bg-gradient-to-r from-[#FFE6C9] to-[#FFD0A3]'} bg-[#0f0f0f]`} >
            <Utilities i18n={i18n} changeLanguage={changeLanguage} resolvedTheme={resolvedTheme} setTheme={setTheme} t={t} />
            {children}
        </div>
    )
}