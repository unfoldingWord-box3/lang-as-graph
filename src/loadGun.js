import Gun from 'gun';
import { csv } from 'd3';
import * as languagesCSV from './data/test.csv';

export default async function loadGun() {
  const languages = Gun().get('languages');
  const regions = Gun().get('regions');
  const countries = Gun().get('countries');

  window.languages = languages;
  window.regions = regions;
  window.countries = countries;

  languages.once((data) => {
    if (!data) {
      csv(languagesCSV, function (languagesData) {
        for (let lang of languagesData) {
          const { code } = lang;
          languages.get(code).put(lang, function () {
            const { gl, code, region, country } = lang;
            languages.get(gl).get('child_languages').set(lang);
            regions.get(region).get('local_languages').set(lang);
            countries.get(country).get('local_languages').set(lang);
          });
        }
      });
    }
  });

  // const languages = await Gun()
  //   .get('languages')
  //   .once((data) => {
  //     // If no data exists for the 'languages node...
  //     if (!data) {
  //       // Load the node with data from the local CSV
  //       csv(languagesCSV, async (languagesData) => {
  //         for (let language of languagesData) {
  //           const { code } = language;
  //           await languages.get(code).put(language);
  //           await setChildOfGateway(code);
  //         }
  //       });
  //     }
  //   });
}

// languagesData.forEach((language) => languages.set(language));
