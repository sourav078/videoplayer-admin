import React, { createContext } from "react";
import { Modal, Space } from "antd";
import { Button } from "./button";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
  okText?: string;
  cancelText?: string;
  isLoading?: boolean;
  customClass?: string;
};

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);

const ConfirmModal = ({
  children,
  title,
  description,
  onConfirm,
  okText = "Yes",
  cancelText = "No",
  isLoading,
  customClass,
}: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  const config = {
    title: title,
    content: description,
    okText: okText,
    cancelText: cancelText,
  };

  return (
    <ReachableContext.Provider value="Light">
      <Space>
        <Button
          className={customClass}
          type="button"
          isLoading={isLoading || false}
          onClick={async () => {
            const confirmed = await modal.confirm(config);
            if (confirmed) {
              onConfirm();
            }
          }}
        >
          {children}
        </Button>
      </Space>

      {contextHolder}

      {/* Can not access this context since `contextHolder` is not in it */}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};

export default ConfirmModal;
