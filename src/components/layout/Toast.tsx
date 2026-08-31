import { Check } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export default function Toast() {
  const { message } = useToast();

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#135029] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-400/30 animate-fade-in">
      <Check className="w-4 h-4 text-emerald-300" />
      <span>{message}</span>
    </div>
  );
}
