import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CompletedGoalsList from './CompletedGoalsList';

export default function CompletedGoalsDialog({ open, onClose, goals, onGoalRemove }) {
    function handleRemove(goalId) {
        onGoalRemove(goalId);
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
