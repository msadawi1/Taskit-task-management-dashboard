import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EventItem = ({ eventInfo }) => {
    const { title, extendedProps } = eventInfo.event;
    const { taskDuration, location } = extendedProps;
    return (
        <Box
            sx={{
                p: { xs: 0.1, sm: 0.5 },
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            {/* Title */}
            <Typography fontSize={{xs: 10, sm: 12}} fontWeight="bold" sx={{ wordBreak: "break-all" }}>
                {title}
            </Typography>
            {taskDuration > 30 && <Typography variant="caption" noWrap sx={{ wordBreak: "break-all" }} >
                {eventInfo.timeText}
            </Typography>}
            {/* Location */}
            {taskDuration >= 90 && location && (
                <Typography variant="caption" color="secondary" noWrap sx={{ wordBreak: "break-all" }}>
                    <em>{location}</em>
                </Typography>
            )}
        </Box>
    );
};

export default EventItem;
