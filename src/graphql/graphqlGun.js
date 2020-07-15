import Gun from 'gun';
import graphqlGun from 'graphql-gun';
import { loader } from 'graphql.macro';

export function languageByCodeQuery(code, callback) {
  graphqlGun(
    loader('./languageByCode.gql'),
    Gun().get('languages').get(code)
  ).then(callback);
}

export function allLanguagesQuery(callback) {
  graphqlGun(loader('./allLanguages.gql'), Gun()).then(callback);
}

export function regionQuery(region, callback) {
  graphqlGun(loader('./region.gql'), Gun().get('regions').get(region)).then(
    callback
  );
}

export function countryQuery(country, callback) {
  graphqlGun(loader('./country.gql'), Gun().get('countries').get(country)).then(
    callback
  );
}
