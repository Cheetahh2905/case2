import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#f8f9fa",
                py: 2,
                mt: 4,
                textAlign: "center",
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} code by Phuc with contribution from GPT
            </Typography>
        </Box>
    );
}
