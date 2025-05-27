export const generateDeck = (theme: string | string[], size: string | string[]) => {
       const generateNumbersDeck = () => {
        let numberCards = ['1', '2', '3', '4', '5', '6', '7', '8']
        if (size === '6x6') {
            numberCards = [
                ...numberCards,
                ...Array.from({ length: 10 }, (_, i) => (i + 9).toString())]
        }
        const deck = [...numberCards, ...numberCards]
        return deck.sort(() => Math.random() - 0.5)
    }

     const generateIconsDeck = () => {
        const nbrToFetch = size === '6x6' ? 18 : 8
        const iconsCards = []
        for (let i = 0; i < nbrToFetch; i++) {
            iconsCards.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`)
        }
        const deck = [...iconsCards, ...iconsCards]
        return deck.sort(() => Math.random() - 0.5)
    }

  return theme === 'numbers' ? generateNumbersDeck() : generateIconsDeck();
};
