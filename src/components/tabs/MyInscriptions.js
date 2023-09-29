const MyInscriptions = () => {
    return (
        <div className="w-[904px] h-[694px] flex flex-col border border-gray-50 rounded-lg px-6 pt-5 pb-6 gap-5 overflow-auto">
            <div className="text-grey-300 text-2xl">My inscriptions</div>
            <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col h-[280px] w-[202px] border border-gray-50 rounded-xl items-center">
                    <div className="mb-4">
                        <img
                            src="/pepepunks.svg"
                            alt="Profile"
                            className="w-[202px] h-[202px]"
                        />
                    </div>
                    <div className="text-xl font-semibold mb-2">Pepe Punks</div>
                    <div className="text-gray-500 text-sm">NO. 9769</div>
                </div>
            </div>
        </div>
    )
}
export default MyInscriptions
