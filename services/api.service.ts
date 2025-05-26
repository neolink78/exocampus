import axios from "axios";

type GameType = {
    players: number,
    winners: string
    theme: 'numbers' | 'icons'
    winner_score: number,
    tries: number,
    time: number
}


const URL = process.env.NEXT_PUBLIC_LOCAL_SERVER  + '/games'

export const postGame = async (game: GameType) => {
    try {
        const { data } = await axios.post(URL, game)
        return data
    } catch (err) {
        console.log(err)
        return err
    }
}

export const getTopTen = async () => {
    try {
        const { data } = await axios.get(`${URL}/top10`)
        return data
    } catch (err) {
        console.log(err)
        return err
    }
}

export const getStats = async () => {
    try {
        const { data } = await axios.get(`${URL}/stats`)
        return data
    } catch (err) {
        console.log(err)
        return err
    }
}