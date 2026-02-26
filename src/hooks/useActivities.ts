import { useMemo } from 'react';
import { locationForRun, titleForRun } from '@/utils/utils';
import activities from '@/static/activities.json';
import { COUNTRY_STANDARDIZATION } from '@/static/city';
import { MUNICIPALITY_CITIES_ARR } from '@/utils/const';

const standardizeCountryName = (country: string): string => {
  for (const [pattern, standardName] of COUNTRY_STANDARDIZATION) {
    if (country.includes(pattern)) {
      return standardName;
    }
  }
  return country;
};

export interface CityStats {
  distance: number;
  count: number;
}

const useActivities = () => {
  const processedData = useMemo(() => {
    const cities: Record<string, CityStats> = {};
    const prefectureCities: Record<string, CityStats> = {};
    const runPeriod: Record<string, number> = {};
    const provinces: Set<string> = new Set();
    const countries: Set<string> = new Set();
    const years: Set<string> = new Set();

    activities.forEach((run) => {
      const location = locationForRun(run);

      const periodName = titleForRun(run);
      if (periodName) {
        runPeriod[periodName] = runPeriod[periodName]
          ? runPeriod[periodName] + 1
          : 1;
      }

      const { city, province, country } = location;
      // drop only one char city
      if (city.length > 1) {
        if (!cities[city]) {
          cities[city] = { distance: 0, count: 0 };
        }
        cities[city].distance += run.distance;
        cities[city].count += 1;
      }
      // Prefecture-level aggregation: for municipalities, use province (e.g. 上海市)
      // instead of district (e.g. 浦东新区)
      const prefectureKey = MUNICIPALITY_CITIES_ARR.includes(province)
        ? province
        : city;
      if (prefectureKey && prefectureKey.length > 1) {
        if (!prefectureCities[prefectureKey]) {
          prefectureCities[prefectureKey] = { distance: 0, count: 0 };
        }
        prefectureCities[prefectureKey].distance += run.distance;
        prefectureCities[prefectureKey].count += 1;
      }
      if (province) provinces.add(province);
      if (country) countries.add(standardizeCountryName(country));
      const year = run.start_date_local.slice(0, 4);
      years.add(year);
    });

    const yearsArray = [...years].sort().reverse();
    const thisYear = yearsArray[0] || '';

    return {
      activities,
      years: yearsArray,
      countries: [...countries],
      provinces: [...provinces],
      cities,
      prefectureCities,
      runPeriod,
      thisYear,
    };
  }, []); // Empty dependency array since activities is static

  return processedData;
};

export default useActivities;
