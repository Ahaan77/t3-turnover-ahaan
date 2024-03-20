
const Interests = ({ item }: { item: String }) => {

    return (
        <div className='flex items-center gap-2 mb-5'>
            <input type="checkbox" className='h-[22px] w-[22px] accent-black' />
            {item}
        </div>
    )

}

export default Interests