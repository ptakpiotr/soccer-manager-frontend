import { Button } from "@mui/material";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import EventModal from "./EventModal";

function AddNewEvent() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <EventModal isOpen={isModalOpen} setOpen={setModalOpen} />
      <Button
        onClick={() => {
          setModalOpen((prev) => !prev);
        }}
        color="error"
      >
        <MdAdd />
      </Button>
    </>
  );
}

export default AddNewEvent;
