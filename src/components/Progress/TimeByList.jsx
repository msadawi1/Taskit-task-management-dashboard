import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"
import SubTitle from "../mini_components/SubTitle";
import ListLine from "./ListLine";

export default function TimeByListCard({ timeByList, totalTime }) {
    const lists = [{ id: 1, title: 'Ibadah', color: 'primary' }, { id: 2, title: 'Career', color: 'blue' }, { id: 3, title: 'Relationships', color: 'info' }, { id: 4, title: 'Health', color: 'success' }];
    return (
        <Paper elevation={1} sx={{ width: '100%', p: 3, backgroundColor: "background.paper" }}>
            <Grid container spacing={1} alignItems='center'>
                <Grid sx={{mb: 2}}>
                    <SubTitle title="Time By List" />
                </Grid>
                {lists.map(list => (
                    <ListLine
                        key={list.id}
                        label={list.title}
                        color={list.color}    // you can later map colors by list if needed
                        mins={timeByList[list.id]}           
                        percentage={
                            totalTime > 0
                                ? (timeByList[list.id] / totalTime) * 100
                                : 0
                        }
                    />
                ))}
            </Grid>
        </Paper>
    )
}