import { X, Bot } from "lucide-react";
import { useToast } from "../../context/ToastContext";

interface AiAssistantModalProps {
  open: boolean;
  onClose: () => void;
  greeting?: string;
  suggestions?: string[];
}

const DEFAULT_SUGGESTIONS = [
  "Fresh Tomato Soup Recipe",
  "How to keep Greens fresh",
  "Healthy 15-min Salads",
];

export default function AiAssistantModal({
  open,
  onClose,
  greeting = "👋 Hello Shiva! What would you like to cook today with our fresh farm arrivals?",
  suggestions = DEFAULT_SUGGESTIONS,
}: AiAssistantModalProps) {
  const { showToast } = useToast();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#D5EAD3] overflow-hidden flex flex-col animate-fade-in z-50">
        <div className="p-4 bg-[#135029] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-emerald-300" />
            <h3 className="text-sm font-bold">VegGo Smart Assistant</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-3 text-left text-xs bg-[#F4FAF4]">
          <div className="p-3 bg-white rounded-xl border border-[#D5EAD3] text-slate-700 shadow-2xs">
            {greeting}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => showToast(`AI Tip loaded for: ${q}`)}
                className="px-2.5 py-1 rounded-full bg-white border border-[#C2DEC1] text-[#135029] font-medium hover:bg-[#EAF6EA] transition text-[11px]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
    </div>
  );
}
