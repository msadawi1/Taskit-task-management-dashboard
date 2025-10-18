import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SubTitle from '../mini_components/SubTitle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FlagIcon from '@mui/icons-material/Flag';
import ReportIcon from '@mui/icons-material/Report';
import { priorityObj } from '../utils/TaskFormUtils';

function formatEventDateRange(start, end, allDay) {
    if (!start) return "";

    // Format date part
    const dateText = start.toLocaleDateString("en-GB", {
        weekday: "short",   // Tue
        day: "2-digit",     // 30
        month: "short",     // Sep
        year: "numeric",    // 2025
    });

    // Format time parts
    const startText = start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const endText = end
        ? end.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        : "";    
    if (allDay) {
        return dateText;
    }
    return `${dateText}, ${startText}${endText ? " - " + endText : ""}`;
}


export default function EventDialog({ open, onClose, event, goalTitle }) {
    if (!event) return null;
    const { title, start, end, priority, location, taskDuration, list: listTitle, allDay } = event;
    const timeText = formatEventDateRange(start, end, allDay)
    return (
        <>
            {open && (
                <Dialog
                    open={open}
                    onClose={onClose}
                    maxWidth="xs"
                    fullWidth
                >
                    <DialogTitle sx={{ pb: 0 }}>
                        <SubTitle color='primary' title={title} />
                    </DialogTitle>
                    <DialogContent>
                        <Box display="flex" flexDirection="column" gap={1}>
                            {timeText && <Typography variant='h6' color='text.secondary' fontWeight="normal">
                                {timeText}
                            </Typography>}
                            {location && <Box display="flex" gap={2}>
                                <LocationPinIcon sx={{ color: "text.secondary" }} />
                                <Typography variant='body1' color='text.secondary' fontWeight="normal">
                                    {location}
                                </Typography>
                            </Box>}
                            {taskDuration > 0 && <Box display="flex" gap={2}>
                                <HourglassTopIcon sx={{ color: "text.secondary" }} />
                                <Typography variant='body1' color='text.secondary' fontWeight="normal">
                                    {taskDuration}m
                                </Typography>
                            </Box>}
                            <Box display="flex" gap={2}>
                                <ReportIcon sx={{ color: "text.secondary" }} />
                                <Typography variant='body1' color='text.secondary' fontWeight="normal">
                                    {priorityObj[priority]}
                                </Typography>
                            </Box>
                            {listTitle && <Box display="flex" gap={2}>
                                <FormatListBulletedIcon sx={{ color: "text.secondary" }} />
                                <Typography variant='body1' color='text.secondary' fontWeight="normal">
                                    {listTitle}
                                </Typography>
                            </Box>}
                            {goalTitle && <Box display="flex" gap={2}>
                                <FlagIcon sx={{ color: "text.secondary" }} />
                                <Typography variant='body1' color='text.secondary' fontWeight="normal">
                                    {goalTitle}
                                </Typography>
                            </Box>}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}
