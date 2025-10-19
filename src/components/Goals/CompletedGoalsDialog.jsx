import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CompletedGoalsList from './CompletedGoalsList';
import { useSnackbarContext } from '../contexts/SnackbarContext';

export default function CompletedGoalsDialog({ open, onClose, goals, onGoalRemove }) {
    const { showSnackbar } = useSnackbarContext();
    function handleRemove(goalId) {
        onGoalRemove(goalId);
        showSnackbar("Goal deleted.");
        onClose();
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle id="dialog-title">
                    Completed Goals
                </DialogTitle>
                <DialogContent>
                    <CompletedGoalsList goals={goals} onRemove={handleRemove} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}
