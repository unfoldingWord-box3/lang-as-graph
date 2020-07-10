import Gun from 'gun';

const languages = Gun().get('languages');
const regions = Gun().get('regions');
const countries = Gun().get('countries');

export function getByCode(code, callback) {
  languages.get(code).once(callback);
}

const getLanguageBy = function (attribute) {
  return function (attrValue, callback) {
    languages.map(function (language, code) {
      if (language[attribute] === attrValue) return callback(language);
    });
  };
};

export const getByName = getLanguageBy('name');
export const getByAnglicizedName = getLanguageBy('anglicized_name');

export function getByRegion(region, callback) {
  regions.get(region).get('local_languages').once(callback);
}
export function getByCountry(country, callback) {
  countries.get(country).get('local_languages').once(callback);
}

window.getByCode = getByCode;
window.getByName = getByName;
window.getByAnglicizedName = getByAnglicizedName;
window.getByRegion = getByRegion;
window.getByCountry = getByCountry;
