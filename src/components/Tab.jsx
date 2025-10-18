import Fade from '@mui/material/Fade';
import React from 'react';

function Tab({ children, value, index, shouldFadeAppear = true }) {
    return ( value === index ? 
        <Fade in={value === index} timeout={200} appear={shouldFadeAppear}>
            <div>
                {children}
            </div>
        </Fade> : null
    )
}

export default React.memo(Tab);