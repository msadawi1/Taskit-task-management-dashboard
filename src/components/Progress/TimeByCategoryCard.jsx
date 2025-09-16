import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"
import SubTitle from "../mini_components/SubTitle";
import CategoryLine from "./CategoryLine";

export default function TimeByCategoryCard() {
    return (
        <Paper elevation={1} sx={{ width: '100%', p: 3, backgroundColor: "background.paper" }}>
            <Grid container spacing={1} alignItems='center'>
                <Grid sx={{mb: 2}}>
                    <SubTitle title="Time By Category" />
                </Grid>
                <CategoryLine label="Study" color="info" mins={700} percentage={34}/>
                <CategoryLine label="Coding" color="blue" mins={800} percentage={43} />
            </Grid>
        </Paper>
    )
}