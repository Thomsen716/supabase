import { useEffect } from "react";

type ModalProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // millisekunder (valgfri)
};

export default function Modal({
  message,
  isOpen,
  onClose,
  duration = 3000,
}: ModalProps) {
  // Luk automatisk efter `duration` ms
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-4 max-w-sm w-full relative animate-fade-in">
        <p className="text-gray-800 text-center">{message}</p>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="Luk"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
