import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ListFilter from "./ListFilter";
import AddButton from "./AddButton";

export default function SearchBar() {
    return (
        <>
            <Paper elevation={1} sx={{ px: 2, py: 2.5 }}>
                <Grid container columnSpacing={1}>
                    <Grid size='grow'>
                        <TextField
                            id="search-field"
                            placeholder="Search tasks..."
                            size="small"
                            fullWidth
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
                    <Grid size={2}>
                        <ListFilter />
                    </Grid>
                    <Grid size={2}>
                        <AddButton />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}