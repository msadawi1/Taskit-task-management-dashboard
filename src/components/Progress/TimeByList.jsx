import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"
import SubTitle from "../mini_components/SubTitle";
import ListLine from "./ListLine";
import Feedback from "../mini_components/Feedback";
import useLists from "../hooks/useLists";

export default function TimeByListCard({ timeByList, totalTime }) {
    const { lists } = useLists();
    return (
        <Paper elevation={1} sx={{ width: '100%', p: 3, backgroundColor: "background.paper" }}>
            <Grid container spacing={1} alignItems='center'>
                <Grid sx={{ mb: 2 }}>
                    <SubTitle title="Time By List" />
                </Grid>
                {lists.length > 0 ? lists.map(list => (
                    <ListLine
                        key={list.name}
                        label={list.name}
                        color={"secondary"}   // you can later map colors by list if needed
                        mins={timeByList[list.name]}
                        percentage={
                            totalTime > 0
                                ? (timeByList[list.name] / totalTime) * 100
                                : 0
                        }
                    />
                )) :
                    <Grid size={12}>
                        <Feedback text="There are no lists at the moment." />
                    </Grid>}
            </Grid>
        </Paper>
    )
}