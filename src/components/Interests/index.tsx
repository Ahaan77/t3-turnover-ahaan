import { useState } from 'react';

const Interests = ({ item, selected, onClick }: { item: string; selected: boolean; onClick: () => void }) => {
    const handleToggle = () => {
        onClick(); // Call the parent component's onClick function to handle selection
    };

    return (
        <div className='flex items-center gap-2 mb-5' onClick={handleToggle}>
            <input type="checkbox" className='h-[22px] w-[22px] accent-black' checked={selected} readOnly />
            {item}
        </div>
    );
};

export default Interests;