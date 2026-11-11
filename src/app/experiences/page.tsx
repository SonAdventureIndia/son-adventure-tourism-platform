import { VERIFIED_EXPERIENCES } from '@/data/destinations';
import { Clock, Users, MapPin, CheckCircle, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';

export default function ExperiencesPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="border-b border-stone-800 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Certified Local Naturalists</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Guided Expeditions & Trails</h1>
        <p className="text-stone-400 text-sm max-w-2xl leading-relaxed">
          Explore Sonbhadra with trained regional guides. Every trail is operated in strict compliance with archaeological protection guidelines and eco-tourism ethics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {VERIFIED_EXPERIENCES.map((exp) => (
          <div key={exp.id} className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden flex flex-col justify-between shadow-2xl">
            <div>
              <div className="h-48 relative overflow-hidden">
                <img src={exp.imageUrl} alt={exp.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-stone-950/90 text-emerald-400 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                  {exp.difficulty} Difficulty
                </div>
              </div>

              <div className="p-6 space-y-4">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">{exp.category}</span>
                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                <p className="text-xs text-stone-300 leading-relaxed">{exp.description}</p>

                <div className="space-y-2 pt-2 text-xs text-stone-400 border-t border-stone-800">
                  <div className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-emerald-400" /> Duration: {exp.duration}</div>
                  <div className="flex items-center"><Users className="w-3.5 h-3.5 mr-2 text-emerald-400" /> Group Size: {exp.groupSize}</div>
                  <div className="flex items-start"><MapPin className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0 mt-0.5" /> Meeting: {exp.meetingPoint}</div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block mb-1">Inclusions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.inclusions.map((inc, i) => (
                      <span key={i} className="text-[11px] bg-stone-950 text-stone-300 px-2 py-0.5 rounded border border-stone-800">
                        ✓ {inc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-stone-950/80 border-t border-stone-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-stone-500 uppercase block">Fee per person</span>
                <span className="text-xl font-extrabold text-white">{exp.pricePerPerson}</span>
              </div>
              <a 
                href={`https://wa.me/917355053822?text=Hello%20Son%20Adventure,%20I%20want%20to%20reserve%20the%20${encodeURIComponent(exp.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Reserve Trail</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
