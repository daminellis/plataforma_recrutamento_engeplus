import { apiClientInstace } from "@/service/axiosClientAuth";
import { IconButton, Menu, MenuItem } from "@mui/material";
import {
  CheckCircledIcon,
  DotsVerticalIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ThreeDotsButton = ({ id }: { id: number }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApprove = async () => {
    await apiClientInstace()
      .get(`candidaturas/aprovar/${id}`)
      .then((response) => {
        toast.success(`Candidato ${id} aprovado com sucesso!`);
      })
      .catch(() => {
        toast.error(`Erro ao aprovar candidato ${id}`);
      });
  };

  const handleReject = async () => {
    await apiClientInstace()
      .get(`candidaturas/reprovar/${id}`)
      .then((response) => {
        toast.success(`Candidato ${id} rejeitado com sucesso!`);
      })
      .catch(() => {
        toast.error(`Erro ao rejeitar candidato ${id}`);
      });
  };

  return (
    <>
      <ToastContainer />
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <DotsVerticalIcon className="size-5" />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          className="text-green-500 flex gap-2 hover:bg-green-500/20"
          onClick={handleApprove}
        >
          <CheckCircledIcon className="size-5" /> Contratar
        </MenuItem>

        <MenuItem
          className="text-red-500 flex gap-2 hover:bg-red-500/20"
          onClick={handleReject}
        >
          <TrashIcon className="size-5" /> Rejeitar
        </MenuItem>
      </Menu>
    </>
  );
};
