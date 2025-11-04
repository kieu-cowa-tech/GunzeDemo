import { Snackbar, Alert } from "@mui/material";
import { useNotifyStore } from "../../../stores/notifyHost";

export default function NotifyHost() {
  const { queue, shift } = useNotifyStore();
  const current = queue[0];

  const handleClose = () => shift();

  return (
    <Snackbar
      key={current?.id}
      open={!!current}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={current?.severity ?? "info"} variant="filled" sx={{ width: "100%" }}>
        {current?.message}
      </Alert>
    </Snackbar>
  );
}
