import { Briefcase, MapPin, ArrowRight } from "lucide-react";

export default function CareersPage() {
  const openings = [
    { title: "Senior React / Frontend Engineer", dept: "Engineering", loc: "Hyderabad (HQ)" },
    { title: "Supply Chain Operations Lead", dept: "Operations", loc: "Kukatpally Fulfillment Hub" },
    { title: "Agronomist & Quality Inspector", dept: "Quality Lab", loc: "Sangareddy Collection Center" },
    { title: "Performance Marketing Specialist", dept: "Growth", loc: "Remote / Hybrid" },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-[#EAF6EA] border border-[#D5EAD3] rounded-3xl p-8 sm:p-12 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#135029] text-xs font-semibold shadow-xs mb-3">
          <Briefcase className="w-3.5 h-3.5 text-[#228B22]" /> Work With Us
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#113B1E]">
          Join the Fresh Food Revolution
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          We are rebuilding India’s fresh supply chain from ground up. Build products that touch millions of breakfasts every morning.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-slate-900">Current Openings</h2>
        {openings.map((job) => (
          <div
            key={job.title}
            className="bg-white border border-[#EEF4ED] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#228B22]/40 transition shadow-xs"
          >
            <div>
              <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                <span className="bg-[#EAF6EA] text-[#135029] px-2 py-0.5 rounded-md font-medium">{job.dept}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.loc}</span>
              </div>
            </div>
            <button
              onClick={() => alert(`Applied for ${job.title}! Email your CV to careers@veggofresh.com`)}
              className="px-4 py-2 rounded-xl bg-[#135029] text-white text-xs font-bold hover:bg-[#0e3b1e] transition flex items-center gap-1.5 cursor-pointer"
            >
              Apply Now <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}