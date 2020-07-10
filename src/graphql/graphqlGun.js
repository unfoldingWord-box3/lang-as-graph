import Gun from 'gun';
import graphqlGun from 'graphql-gun';
import { loader } from 'graphql.macro';

export function languageByCodeQuery(code, callback) {
  graphqlGun(
    loader('./languageByCode.gql'),
    Gun().get('languages').get(code)
  ).then((result) => callback(result));
}

export function allLanguagesQuery(callback) {
  graphqlGun(loader('./allLanguages.gql'), Gun()).then((result) =>
    callback(result)
  );
}

export function regionQuery(region, callback) {
  graphqlGun(
    (regionQuery = loader('./region.gql')),
    Gun().get('regions').get(region)
  ).then((result) => callback(result));
}

export function countryQuery(country, callback) {
  graphqlGun(
    (regionQuery = loader('./country.gql')),
    Gun().get('countries').get(country)
  ).then((result) => callback(result));
}
