import { Compass, ShieldCheck, HeartHandshake, Trees, MapPin, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="border-b border-stone-800 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Institutional Heritage</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white">About Sonbhadra & Our Mission</h1>
        <p className="text-stone-400 text-sm leading-relaxed">
          Son Adventure Tours & Eco Tourism is an official destination discovery platform dedicated to positioning Sonbhadra on the global tourism map through verified knowledge and sustainable practices.
        </p>
      </div>

      <div className="space-y-6 text-sm text-stone-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-white">Geological & Cultural Powerhouse</h2>
        <p>
          Situated at the confluence of four Indian states (Uttar Pradesh, Madhya Pradesh, Chhattisgarh, and Jharkhand), Sonbhadra represents one of the most ancient landmasses in the subcontinent. The sedimentary rock sequences of the Vindhyan Supergroup at Salkhan preserve stromatolite fossils dating to the Mesoproterozoic era—approximately 1,400,000,000 years ago.
        </p>
        <p>
          Beyond geology, the region has served as a cultural crossroads for millennia, harboring pre-historic rock art shelters, medieval fortresses like Vijaygarh, and diverse indigenous tribal communities (Gond, Baiga, Kharwar, Kol) whose stewardship has safeguarded local ecological corridors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <h3 className="font-bold text-white text-base">Fact-Checked Platform</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Every coordinate, distance, and historical narrative on our platform is cross-referenced with district authorities and published geological research.
          </p>
        </div>

        <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-2">
          <HeartHandshake className="w-6 h-6 text-emerald-400" />
          <h3 className="font-bold text-white text-base">Community Prosperity</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            We directly connect travelers with verified regional guides and homestays, ensuring tourism revenue benefits Sonbhadra&apos;s local economy.
          </p>
        </div>
      </div>
    </div>
  );
}
