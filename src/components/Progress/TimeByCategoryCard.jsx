import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"
import SubTitle from "../mini_components/SubTitle";
import CategoryLine from "./CategoryLine";

export default function TimeByCategoryCard({ timeByCategory, totalTime }) {
    const categories = [{ id: 1, title: 'Ibadah', color: 'primary' }, { id: 2, title: 'Career', color: 'blue' }, { id: 3, title: 'Relationships', color: 'info' }, { id: 4, title: 'Health', color: 'success' }];
    return (
        <Paper elevation={1} sx={{ width: '100%', p: 3, backgroundColor: "background.paper" }}>
            <Grid container spacing={1} alignItems='center'>
                <Grid sx={{mb: 2}}>
                    <SubTitle title="Time By Category" />
                </Grid>
                {categories.map(category => (
                    <CategoryLine
                        key={category.id}
                        label={category.title}
                        color={category.color}    // you can later map colors by category if needed
                        mins={timeByCategory[category.id]}           
                        percentage={
                            totalTime > 0
                                ? (timeByCategory[category.id] / totalTime) * 100
                                : 0
                        }
                    />
                ))}
            </Grid>
        </Paper>
    )
}