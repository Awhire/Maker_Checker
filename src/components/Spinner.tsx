import { CircularProgress, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const styles = (theme: any) => ({
  margin: {
    my: "4rem",
    [theme.breakpoints.up("md")]: {
      my: "8rem",
    },
  },
});

const Spinner = () => {
  const theme = useTheme();
  const classes = styles(theme);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress
        size={80}
        sx={{ ...classes.margin }}
        thickness={2}
        color="primary"
      />
    </Box>
  );
};

export default Spinner;
