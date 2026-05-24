// src/components/ui/modal.tsx
import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, description, isOpen, onClose, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-brand-ivory">
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle className="text-brand-dark font-heading text-2xl">{title}</DialogTitle>}
            {description && <DialogDescription className="text-brand-muted">{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
