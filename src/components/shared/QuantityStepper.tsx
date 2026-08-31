import { Plus, Minus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
}

export default function QuantityStepper({
  value,
  onIncrease,
  onDecrease,
  min = 1,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-3.5 bg-white border border-[#DCEAD9] rounded-lg px-3.5 py-2.5 shadow-2xs">
      <button
        onClick={onDecrease}
        disabled={value <= min}
        className="hover:opacity-75 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5 text-[#135029]" strokeWidth={3} />
      </button>
      <span className="text-xs font-bold w-4 text-center text-slate-900">{value}</span>
      <button onClick={onIncrease} className="hover:opacity-75" aria-label="Increase quantity">
        <Plus className="w-3.5 h-3.5 text-[#135029]" strokeWidth={3} />
      </button>
    </div>
  );
}
