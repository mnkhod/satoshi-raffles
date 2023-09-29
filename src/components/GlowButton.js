export default function Button({ children, onClick, customStyle }) {
    return (
        <button
            className={`text-base bg-defaultGray border-lightGray px-[16px] py-[12px] h-[48px] hover:border-white ${customStyle} glow-on-hover`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
