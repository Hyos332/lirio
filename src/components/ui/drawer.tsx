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
  children: ReactNode;
};

export function Drawer({
  open,
  onClose,
  title,
  side = "right",
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
        "fixed inset-y-0 m-0 h-dvh max-h-none w-full max-w-sm bg-bg p-0 text-ink transition-[translate,display,overlay] transition-discrete duration-200 open:translate-x-0",
        "backdrop:bg-ink/40 backdrop:transition-[background-color,display,overlay] backdrop:transition-discrete backdrop:duration-200 starting:open:backdrop:bg-ink/0",
        sides[side],
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line pr-2 pl-4">
          <h2 id={titleId} className="text-lg font-medium">
            {title}
          </h2>
          <IconButton icon="close" label="Cerrar" onClick={onClose} />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </dialog>
  );
}
