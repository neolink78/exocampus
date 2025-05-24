import { useRouter } from "next/router"

export default function Game() {
    const router = useRouter()
    console.log(router)
    return (
        <div>yoyo</div>
    )
}