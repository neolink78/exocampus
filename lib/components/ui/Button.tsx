type ButtonType = {
    onClick: () => void
    value: string
    set: string | number
}

export const Button = ({ value, set, onClick }: ButtonType) => {
    return (
        <button
            className={`hover:bg-blue-500 py-1 px-8 border rounded-2xl ${value.toLowerCase() === String(set) ? 'bg-blue-500' : 'bg-blue-200'} `}
            onClick={onClick}
        >
            {value}
        </button>
    )
}