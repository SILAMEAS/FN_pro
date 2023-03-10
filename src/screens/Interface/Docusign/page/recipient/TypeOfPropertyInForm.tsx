import {SigningProcess} from '@utils/classes/interfaces/APIInterface';
export enum TypeCardinality {
  One = 'one',
  All = 'all',
}
enum SignatureType {
  Envelopped = '1',
  Envelopping = '2',
  Detached = '3',
}
export const TypeOfPropertyInForm = {
  processT: Object.values(SigningProcess),
  signatureTypeT: Object.values(SignatureType),
  cardinalityT: Object.values(TypeCardinality),
};
export const PropertyInForm = {
  processP: 'process',
  signatureTypeP: 'signatureType',
  cardinalityP: 'cardinality',
};
export const ValueOfPropertyInForm = {
  processV: Object.values(SigningProcess),
};
