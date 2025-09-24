import React from 'react';
import Grid from '@mui/material/Grid';
import WeeklyGoal from "./WeeklyGoal";

function GoalList({ goals, onRemove, onClick }) {
    return (
        <>
            {
                goals.map(goal =>
                    <Grid key={goal.id} size={12}>
                        <WeeklyGoal
                            {...goal}
                            onRemove={onRemove}
                            onClick={() => onClick(goal.id)}
                        />
                    </Grid>
                )
            }
        </>
    );
}

export default React.memo(GoalList);