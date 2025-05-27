import { useState } from "react";
import { useRouter } from "next/router";
import { GameSettings } from "@/components/index/gameSettings";
import { useTranslation } from "next-i18next";
import { getStaticPropsWithTranslations } from '@/hoc/serverSideProps';

export const getStaticProps = getStaticPropsWithTranslations()

export default function Home() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [gamePrepared, setGamePrepared] = useState({
    theme: 'numbers',
    players: 1,
    size: '4x4'
  })

  const startGame = () => {
    router.push(`/game?theme=${gamePrepared.theme}&players=${gamePrepared.players}&size=${gamePrepared.size}`)
  }

  return (
    <div className="pb-10">
      <header className='text-xl sm:text-2xl py-6 sm:py-10 text-center' >
        {t("homepage_title")}
      </header>
      <GameSettings gamePrepared={gamePrepared} setGamePrepared={setGamePrepared} startGame={startGame} t={t} />
    </div>
  );
}
