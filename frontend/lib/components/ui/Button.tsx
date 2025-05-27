type ButtonType = {
    onClick: () => void
    value: string
    label: string
    set: string | number
}

export const Button = ({ value, set, onClick, label }: ButtonType) => {
    return (
        <button
            className={`hover:bg-blue-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-black py-1 px-8 border rounded-2xl ${value.toLowerCase() === String(set) ? 'bg-blue-500 text-white dark:bg-orange-500 dark:text-black' : 'bg-blue-200 dark:bg-orange-300 text-black'} `}
            onClick={onClick}
        >
            {label}
        </button>
    )
}