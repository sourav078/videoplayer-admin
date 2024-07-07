import React from "react";
import { Popover } from "antd";

type PopoversProps = {
  body: React.ReactNode | any;
  title: React.ReactNode;
  trigger: "click" | "hover" | "focus" | "contextMenu";
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  placement:
    | "topLeft"
    | "top"
    | "topRight"
    | "leftTop"
    | "left"
    | "leftBottom"
    | "rightTop"
    | "right"
    | "rightBottom"
    | "bottomLeft"
    | "bottom"
    | "bottomRight";
};

const Popovers = ({
  body,
  title,
  trigger,
  open,
  setOpen,
  children,
  placement,
}: PopoversProps) => {
  return (
    <Popover
      placement={placement}
      content={body}
      title={<p className="p-2 text-[18px] font-semibold">{title}</p>}
      trigger={trigger}
      open={open}
      onOpenChange={() => setOpen(!open)}
    >
      {children}
    </Popover>
  );
};

export default Popovers;
