import Gun from 'gun';
import { csv } from 'd3';
import * as languagesCSV from './test.csv';

export default async function loadGun() {
  const gun = Gun();

  gun.get('languages').once((data) => {
    if (!data) {
      console.log('loading');
      const languages = gun.get('languages');
      const regions = gun.get('regions');
      const countries = gun.get('countries');

      csv(languagesCSV, function (languagesData) {
        for (let lang of languagesData) {
          const { code, gl, region, country } = lang;
          const langRef = languages.get(code).put(lang);
          languages.get(gl).get('child_languages').set(langRef);
          regions.get(region).get('local_languages').set(langRef);
          countries.get(country).get('local_languages').set(langRef);
        }
      });
    } else {
      console.log('pre loaded');
    }
  });
}
