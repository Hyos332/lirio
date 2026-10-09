"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

import { IconButton } from "./icon-button";

const sides = {
  left: "left-0 -translate-x-full starting:open:-translate-x-full",
  right: "right-0 left-auto translate-x-full starting:open:translate-x-full",
};

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: keyof typeof sides;
  footer?: ReactNode;
  children: ReactNode;
};

export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  footer,
  children,
}: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "fixed inset-y-0 m-0 h-dvh max-h-none w-full max-w-sm bg-bg p-0 text-ink transition-[translate,display,overlay] transition-discrete duration-300 open:translate-x-0",
        "backdrop:bg-dark/40 backdrop:backdrop-blur-sm backdrop:transition-[background-color,backdrop-filter,display,overlay] backdrop:transition-discrete backdrop:duration-300 starting:open:backdrop:bg-dark/0 starting:open:backdrop:backdrop-blur-none",
        sides[side],
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line pr-2 pl-4">
          <h2 id={titleId} className="font-display text-h2-sm">
            {title}
          </h2>
          <IconButton icon="close" label="Cerrar" onClick={onClose} />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && (
          <div className="shrink-0 border-t border-line p-4">{footer}</div>
        )}
      </div>
    </dialog>
  );
}
