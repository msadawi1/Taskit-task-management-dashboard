import Feedback from "../mini_components/Feedback";
import Grid from "@mui/material/Grid";
import CompletedGoal from "./CompletedGoal";

export default function GoalList({ goals, onRemove }) {
    return (
        <>
            {
                goals.length > 0 ?
                    <Grid container spacing={0.5}>
                        {goals.map(goal =>
                            <Grid size={12} key={goal.id}>
                                <CompletedGoal id={goal.id} title={goal.title} onRemove={onRemove} />
                            </Grid>
                        )}
                    </Grid>
                    :
                    <Feedback text="There are no completed goals at the moment." />
            }
        </>
    );
}