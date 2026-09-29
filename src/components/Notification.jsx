import { Box, Paper, Typography } from "@mui/material";

const Notification = ({ text, type = "success" }) => {
  if (!text) return null;

  const colors = {
    success: { bg: "#e8f5e9", border: "#43a047", textColor: "#1b5e20" },
    error: { bg: "#ffebee", border: "#e53935", textColor: "#b71c1c" },
    info: { bg: "#e3f2fd", border: "#1e88e5", textColor: "#0d47a1" },
  };

  const style = colors[type] || colors.success;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1300,
        width: "auto",
        minWidth: 280,
        maxWidth: 500,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: style.bg,
          borderLeft: `4px solid ${style.border}`,
          px: 3,
          py: 1.5,
          textAlign: "center",
          animation: "slideDown 0.3s ease-out",
          "@keyframes slideDown": {
            from: { opacity: 0, transform: "translateY(-20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: style.textColor, fontWeight: 500 }}
        >
          {text}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Notification;
