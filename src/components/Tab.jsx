import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import React from 'react';

function Tab({ children, value, index, shouldFadeAppear = true }) {
    function TabPanel({ children, value, index }) {
        return value === index ? <Box sx={{ flexGrow: 1 }}>{children}</Box> : null;
    }

    return <TabPanel value={value} index={index}>
        <Fade in={value === index} timeout={200} appear={shouldFadeAppear} mountOnEnter unmountOnExit>
            <div>
                {children}
            </div>
        </Fade>
    </TabPanel>
}

export default React.memo(Tab);