import Stat from '@/components/Stat';
import useActivities from '@/hooks/useActivities';
import { DIST_UNIT, M_TO_DIST } from '@/utils/utils';

const PREFECTURE_ZOOM_THRESHOLD = 8;

// only support China for now
const CitiesStat = ({
  onClick,
  zoom,
}: {
  onClick: (_city: string) => void;
  zoom: number;
}) => {
  const { cities, prefectureCities } = useActivities();

  const usePrefecture = zoom <= PREFECTURE_ZOOM_THRESHOLD;
  const data = usePrefecture ? prefectureCities : cities;

  const citiesArr = Object.entries(data);
  citiesArr.sort((a, b) => b[1].distance - a[1].distance);
  return (
    <div className="cursor-pointer">
      <section>
        {citiesArr.map(([city, stats]) => (
          <Stat
            key={city}
            value={city}
            description={` ${stats.count}次 ${(stats.distance / M_TO_DIST).toFixed(0)} ${DIST_UNIT}`}
            citySize={3}
            onClick={() => onClick(city)}
          />
        ))}
      </section>
      <hr />
    </div>
  );
};

export default CitiesStat;
