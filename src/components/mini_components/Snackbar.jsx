import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { useSnackbarContext } from "../contexts/SnackbarContext";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

export default function SnackbarFeedback() {
    const { open, horizontal, vertical, message, closeSnackbar } = useSnackbarContext();
    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackbar}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
    return (
        <Snackbar
            slotProps={{ content: { sx: { bgcolor: "primary.main" } } }}
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={4000}
            open={open}
            slots={{ transition: Slide }}
            onClose={closeSnackbar}
            message={message}
            action={action}
        />
    );
}