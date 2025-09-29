import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ListFilter from "./ListFilter";
import Button from "@mui/material/Button";

export default function TaskControls({ search, setSearch }) {
    return (
        <>
            <Paper elevation={1} sx={{ px: 2, py: 2.5 }}>
                <Grid container columnSpacing={1} rowSpacing={2}>
                    <Grid size='grow'>
                        <TextField
                            id="search-field"
                            placeholder="Search tasks..."
                            size="small"
                            fullWidth
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={1.5}>
                        <ListFilter />
                    </Grid>
                    <Grid size={1.5}>
                        <Button fullWidth color='success' variant="contained">New List</Button>
                    </Grid>
                    <Grid size={1.5}>
                        <Button fullWidth color='warning' variant="contained">Delete List</Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}