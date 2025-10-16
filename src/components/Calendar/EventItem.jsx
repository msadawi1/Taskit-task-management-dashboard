import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EventItem = ({ eventInfo }) => {
    const { title, extendedProps } = eventInfo.event;
    const { taskDuration, location } = extendedProps;
    return (
        <Box
            sx={{
                p: { xs: 0.3, sm: 0.5 },
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                minWidth: 0,
                maxWidth: '100%',
                height: '100%',
            }}
        >
            {/* Title */}
            <Typography
                fontSize={{ xs: 10, sm: 12 }}
                fontWeight="bold"
                sx={{
                    wordBreak: "break-word",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    minWidth: 0,
                    maxWidth: '100%',
                }}
                title={title}
            >
                {title}
            </Typography>
            {taskDuration > 30 && (
                <Typography
                    variant="caption"
                    sx={{
                        wordBreak: "break-word",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        minWidth: 0,
                        maxWidth: '100%',
                    }}
                    title={eventInfo.timeText}
                >
                    {eventInfo.timeText}
                </Typography>
            )}
            {/* Location */}
            {taskDuration >= 90 && location && (
                <Typography
                    variant="caption"
                    color="secondary"
                    sx={{
                        wordBreak: "break-word",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        minWidth: 0,
                        maxWidth: '100%',
                    }}
                    title={location}
                >
                    <em>{location}</em>
                </Typography>
            )}
        </Box>
    );
};

export default EventItem;
