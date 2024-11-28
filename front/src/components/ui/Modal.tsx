import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { AppButton } from "./button/AppButton";

interface ModalProps {
  children: ReactNode;
  content: JSX.Element;
  className?: string;
}

export const Modal = ({ children, content, className }: ModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn" />

        <Dialog.Content
          className={`fixed left-[50%] top-[50%] flex max-h-[85vh] flex-col ${className} bg-white z-20 translate-x-[-50%] translate-y-[-50%] rounded-xl bg-hei-se-black p-8 focus:outline-none data-[state=closed]:animate-contentHide data-[state=open]:animate-contentShow`}
        >
          {/* X icon */}

          <Dialog.Close className="focus:outline-none absolute bg-white p-3 rounded-full -right-14 top-0">
            <Cross1Icon />
          </Dialog.Close>

          {/* Content */}
          <div className="flex-1">{content}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
