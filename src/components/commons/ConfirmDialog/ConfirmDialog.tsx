import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from "@mui/material";
import { useStore } from "zustand";
import { confirmDialogStore } from "./confirmDialog";

export default function ConfirmDialog() {
  const open = useStore(confirmDialogStore, s => s.open);
  const opts = useStore(confirmDialogStore, s => s.opts);
  const accept = useStore(confirmDialogStore, s => s.accept);
  const reject = useStore(confirmDialogStore, s => s.reject);

  return (
    <Dialog open={open} onClose={reject} maxWidth="xs" fullWidth>
      {opts.title && <DialogTitle>{opts.title}</DialogTitle>}
      {opts.message && (
        <DialogContent dividers>
          {typeof opts.message === "string" ? (
            <Typography variant="body2">{opts.message}</Typography>
          ) : opts.message}
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={reject} color="inherit">
          {opts.cancelText ?? "Cancel"}
        </Button>
        <Button
          onClick={accept}
          variant="contained"
          color={opts.danger ? "error" : "primary"}
        >
          {opts.confirmText ?? "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
