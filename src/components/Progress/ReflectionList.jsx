import Grid from "@mui/material/Grid";
import Reflection from "./Reflection";

export default function ReportsList() {
    const reports = [
        {
            id: 1,
            date: "2025-09-12",
            content:
                "Today I worked on setting up the new API endpoints for the project. It took longer than expected because of authentication issues, but I managed to resolve them by configuring middleware properly.",
        },
        {
            id: 2,
            date: "2025-09-13",
            content:
                "Had a productive discussion with the team about UI improvements. We decided to adopt a consistent design system and use reusable components for better maintainability.",
        },
        {
            id: 3,
            date: "2025-09-14",
            content:
                "Spent most of the day debugging an issue with the calendar integration. The root cause was time zone differences when parsing user input. Added utilities to normalize all dates to UTC.",
        },
    ];


    return (
        <Grid container rowSpacing={1}>
            {reports.map(report =>
                <Grid key={report.id} size={12}>
                    <Reflection {...report} />
                </Grid>
            )}
        </Grid>
    )
}