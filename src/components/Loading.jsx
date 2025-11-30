import React from 'react';
import { SpinnerRoundOutlined } from 'spinners-react';

const Loading = () => {
    return (
        <div className='h-200 flex items-center justify-center'>
            <SpinnerRoundOutlined size={50} thickness={100} speed={100} color="rgba(57, 172, 79, 1)" />
        </div>
    );
};

export default Loading;