import Gun from 'gun';
import { csv } from 'd3';
import * as languagesCSV from './data/languages.csv';

export default async function loadGun() {
  const languages = await Gun()
    .get('languages')
    .once(async (data) => {
      // If no data exists for the 'languages node...
      if (!data) {
        // Load the node with data from the local CSV
        csv(languagesCSV, (languagesData) => {
          // let i = 0;
          for (let language of languagesData) {
            languages.get(language.code).put(language).once(console.log);
            // i++;
            // if (i > 10) break;
          }
          // languages.map().once((language) => {
          //   const { gl, code } = language;
          //   languages.get(gl).get('child_languages').get(code).put(language);
          // });
        });
      }
    });
}

// languagesData.forEach((language) => languages.set(language));
