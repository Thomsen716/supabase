import { useEffect } from "react";

type ToastProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // millisekunder (valgfri)
};

export default function Toast({
  message,
  isOpen,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-gray-800 text-white px-5 py-3 rounded-lg shadow-lg flex items-center space-x-3">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white font-bold"
          aria-label="Luk"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
