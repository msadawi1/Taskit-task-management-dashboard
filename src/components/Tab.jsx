import Fade from '@mui/material/Fade';
import React from 'react';

function Tab({ children, value, index, shouldFadeAppear = true }) {
    return <Fade in={value === index} timeout={200} appear={shouldFadeAppear}>
            <div style={{display: value === index ? 'block' : 'none'}}>
                {children}
            </div>
        </Fade>
}

export default React.memo(Tab);