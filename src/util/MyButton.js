import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const MyButton = ({ children, onClick, tip, btnClassName, tipClassName, color }) => (
    <Tooltip title={tip} placement="top" className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)

export default MyButton