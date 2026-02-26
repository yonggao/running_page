import Stat from '@/components/Stat';
import useActivities from '@/hooks/useActivities';

// only support China for now
const LocationSummary = () => {
  const { years, countries, provinces, prefectureCities } = useActivities();
  return (
    <div className="cursor-pointer">
      <section>
        {years ? (
          <Stat value={`${years.length}`} description=" 年里我跑过" />
        ) : null}
        {countries ? (
          <Stat value={countries.length} description=" 个国家" />
        ) : null}
        {provinces ? (
          <Stat value={provinces.length} description=" 个省份" />
        ) : null}
        {prefectureCities ? (
          <Stat value={Object.keys(prefectureCities).length} description=" 个城市" />
        ) : null}
      </section>
      <hr />
    </div>
  );
};

export default LocationSummary;
