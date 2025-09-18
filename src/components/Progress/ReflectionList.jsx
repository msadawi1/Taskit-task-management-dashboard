import Grid from "@mui/material/Grid";
import Reflection from "./Reflection";

export default function ReportsList({ reflections, onDelete }) {
    return (
        <Grid container rowSpacing={1}>
            {reflections.map(reflection =>
                <Grid key={reflection.id} size={12}>
                    <Reflection {...reflection} onDelete={onDelete}/>
                </Grid>
            )}
        </Grid>
    )
}