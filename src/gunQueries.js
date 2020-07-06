import Gun from 'gun';

export async function getByCode(code, callback) {
  const languages = await Gun().get('languages');
  languages.get(code).once(function (language) {
    language.child_languages = getChildLanguages(language);
    callback(language);
  });
}

const getLanguageBy = function (attribute) {
  return async function (attrValue, callback) {
    Gun()
      .get('languages')
      .map(function (language, code) {
        if (language[attribute] === attrValue) {
          language.child_languages = getChildLanguages(language);
          return callback(language);
        }
      });
  };
};

function getChildLanguages(gatewayLanguage) {
  const child_languages = [];
  Gun()
    .get('languages')
    .map(function (l, code) {
      l.gl === gatewayLanguage.code && child_languages.push(l);
    });
  return child_languages;
}

export const getByName = getLanguageBy('name');
export const getByAnglicizedName = getLanguageBy('anglicized_name');

const getLanguagesBy = function (attribute) {
  return async function (attrValue, callback) {
    let matches = [];
    Gun()
      .get('languages')
      .map(function (language, code) {
        language[attribute] === attrValue && matches.push(language);
      });
    for (let match of matches) {
      match.child_languages = getChildLanguages(match);
    }
    const obj = {
      [attribute]: attrValue,
      local_languages: matches,
    };
    callback(obj);
  };
};

export const getByRegion = getLanguagesBy('region');
export const getByCountry = getLanguagesBy('coutry');
