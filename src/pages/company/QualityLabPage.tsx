import { ShieldCheck, TestTube, Microscope, Award } from "lucide-react";

export default function QualityLabPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-[#EAF6EA] border border-[#D5EAD3] rounded-3xl p-8 sm:p-12 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#135029] text-xs font-semibold shadow-xs mb-3">
          <Award className="w-3.5 h-3.5 text-[#228B22]" /> NABL & FSSAI Standards
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#113B1E]">
          VegGo Quality Assurance & Testing Lab
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          We test every single lot for heavy metals, chemical residues, and micro-contaminants before it gets packed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#EEF4ED] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF6EA] flex items-center justify-center text-[#228B22]">
            <TestTube className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Pesticide Residue Screen</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Multi-residue gas chromatography testing checks over 120 banned chemical compounds on every farm batch.
          </p>
        </div>

        <div className="bg-white border border-[#EEF4ED] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF6EA] flex items-center justify-center text-[#228B22]">
            <Microscope className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Ozonated Water Wash</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Hydroponic greens and fruits are washed in food-grade ozonated water removing 99.9% surface bacteria and wax.
          </p>
        </div>

        <div className="bg-white border border-[#EEF4ED] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF6EA] flex items-center justify-center text-[#228B22]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">Cold Chain Integrity</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Constant 4°C–8°C microclimate tracking from farm collection point to final doorstep dispatch.
          </p>
        </div>
      </div>
    </div>
  );
}