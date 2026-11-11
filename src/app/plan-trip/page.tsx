export default function PlanTripPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-stone-900">How to Reach Sonbhadra</h1>
      <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-4 text-sm text-stone-700">
        <div>
          <h2 className="font-bold text-stone-900 text-base">✈️ Nearest Airport</h2>
          <p>Lal Bahadur Shastri International Airport (VNS), Varanasi (~105 km to Robertsganj). Regular cabs and buses available.</p>
        </div>
        <hr className="border-stone-100" />
        <div>
          <h2 className="font-bold text-stone-900 text-base">🚆 Nearest Railway Stations</h2>
          <p>Sonbhadra (Robertsganj), Churk, and Renukoot (RNQ). Major junctions nearby: Pt. Deen Dayal Upadhyaya Jn (DDU) and Mirzapur.</p>
        </div>
        <hr className="border-stone-100" />
        <div>
          <h2 className="font-bold text-stone-900 text-base">🚗 By Road</h2>
          <p>State Highway 5A connects Varanasi directly to Robertsganj via a smooth 4-lane expressway corridor.</p>
        </div>
      </div>
    </div>
  );
}
