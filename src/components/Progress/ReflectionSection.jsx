import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"
import SubTitle from "../mini_components/SubTitle";
import AddIcon from '@mui/icons-material/Add';
import ReportsList from "./ReflectionList";
import Feedback from '../mini_components/Feedback';

function ReflectionSection({ reflections, onDelete, onClick }) {
    return (
        <Grid container size={12} rowSpacing={2}>
            <Grid size="grow">
                <SubTitle title="Daily Reflections" />
            </Grid>
            <Grid size="auto">
                <Button variant="contained" size="medium" onClick={onClick} startIcon={<AddIcon />}>Create</Button>
            </Grid>
            <Grid size={12}>
            {
                reflections.length > 0 ? 
                <ReportsList reflections={reflections} onDelete={onDelete} /> :
                    <Feedback color="secondary.dark" text="No reflections at the moment." />
            }
            </Grid>
        </Grid>
    );
}

export default React.memo(ReflectionSection);