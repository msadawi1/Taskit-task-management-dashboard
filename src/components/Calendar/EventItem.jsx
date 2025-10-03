import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EventItem = ({ eventInfo }) => {
    const { title, extendedProps } = eventInfo.event;
    const { taskDuration, location } = extendedProps;
    return (
        <Box
            sx={{
                p: 0.5,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            {/* Title */}
            <Typography variant="caption" fontWeight="bold" noWrap>
                {title}
            </Typography>
            {taskDuration > 30 && <Typography variant="caption" noWrap>
                {eventInfo.timeText} 
            </Typography> }
            {/* Location */}
            {taskDuration >= 90 && location && (
                <Typography variant="caption" color="secondary" noWrap>
                    <em>{location}</em>
                </Typography>
            )}
        </Box>
    );
};

export default EventItem;
