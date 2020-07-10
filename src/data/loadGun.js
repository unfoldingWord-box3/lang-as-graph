import Gun from 'gun';
import { csv } from 'd3';
import * as languagesCSV from './test.csv';

export default async function loadGun() {
  const languages = Gun().get('languages');
  const regions = Gun().get('regions');
  const countries = Gun().get('countries');

  window.languages = languages;
  window.regions = regions;
  window.countries = countries;

  languages.once((data) => {
    // return localStorage.clear();
    if (!data) {
      csv(languagesCSV, function (languagesData) {
        for (let lang of languagesData) {
          const { code } = lang;
          languages.get(code).put(lang, async function () {
            const { gl, region, country } = lang;
            await languages.get(gl).get('child_languages').set(lang);
            await regions.get(region).get('local_languages').set(lang);
            await countries.get(country).get('local_languages').set(lang);
          });
        }
      });
    }
  });
}
