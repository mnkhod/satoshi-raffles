import Button from '../Button'
const MyCreatedRaffles = () => {
    return (
        <div className="w-[904px] h-auto grid grid-cols-3 border border-gray-50 rounded-lg px-6 pt-5 pb-6 gap-5 overflow-auto">
            <div className="h-auto bg-white rounded-2xl overflow-hidden shadow-lg">
                <img
                    className="w-70 h-70 object-cover"
                    src="/bitcoinbandit.svg"
                    alt="Card"
                />
                <div className="">
                    <p className="text-gray-700 text-base">
                        Bitcoin Bandit #247
                    </p>
                    <p className="text-gray-700 text-base">0.67 PSAT</p>
                    <p className="text-gray-700 text-base">0 sold</p>
                </div>
                <div className="flex flex-col">
                    <Button>View</Button>
                    <Button>Cancel</Button>
                </div>
            </div>
        </div>
    )
}
export default MyCreatedRaffles
