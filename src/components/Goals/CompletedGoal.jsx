import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function CompletedGoal({ title, id, onRemove }) {
    return (
        <Grid container alignItems="center" sx={{ width: "100%" }}>
            <Grid size='grow'>
                <Typography
                    sx={{ fontSize: 18, color: 'primary.main', fontWeight: 400, lineHeight: 1.2 }}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid size='auto'>
                <IconButton onClick={() => onRemove(id)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default React.memo(CompletedGoal);
