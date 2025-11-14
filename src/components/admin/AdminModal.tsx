import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";

interface ModalProps {
  open: boolean;
  handleOK: () => void;
  onClose: () => void;
  loading?: boolean;
  title?: string;
  buttonLabel?: string;
  children: React.ReactNode;
}

const AdminModal: React.FC<ModalProps> = ({
  open,
  onClose,
  handleOK,
  title,
  loading,
  buttonLabel,
  children,
}) => {
  if (!open) return null;

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <i className="icon-cancel-circled" />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button
          autoFocus
          disabled={loading}
          loading={loading}
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleOK}
        >
          {buttonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminModal;
