import {UploadsService} from '@src/services/uploads';
import {API_URL} from '@src/config/env';
import {SessionsService} from '@src/services/sessions';
import {DocumentsService} from '@src/services/documents';
import {ActorsService} from '@src/services/actors';
import {AcceptedLanguages} from '@utils/classes/interfaces/APIConstants';
import {ScenariosService} from '@src/services/scenarios';
import {ScenarioService} from '@src/services/scenario';
import {SessionService} from '@src/services/session';
import {CaService} from '@src/services/ca';
import {CertificatesService} from '@src/services/certificates';
import {DocumentService} from '@src/services/document';
import {DownloadService} from '@src/services/download';
import {ActorService} from '@src/services/actor';
import {TypeScenario} from '@src/redux/counter/Type/Type';
//=======================HEADER
const header = {
  defaultlanguage: AcceptedLanguages.FR,
  certignahash: 'ySsPUR23',
  certignarole: 2,
  certignauser: 'pps#test',
  'content-type': 'application/json',
  accept: 'application/json',
};
//=======================HEADER
export const JHeader = {
  certignahash: 'ySsPUR23',
  certignarole: 2,
  certignauser: 'pps#test',
};
//--------------------------------API
export const uploadApi = new UploadsService(
  API_URL ?? 'http://10.2.50.23:8080',
  JHeader,
);
export const sessionsApi = new SessionsService(
  API_URL ?? 'http://10.2.50.23:8080',
  JHeader,
);
export const sessionApi = new SessionService(
  API_URL ?? 'http://10.2.50.23:8080',
  JHeader,
);

export const documentsApi = new DocumentsService(
  API_URL ?? 'http://10.2.50.23:8080',
  JHeader,
);
export const documentApi = new DocumentService(
  API_URL ?? 'http://10.2.50.23:8080',
  JHeader,
);

export const actorsApi = new ActorsService(
  API_URL ?? 'http://10.2.50.23:8080',
  JHeader,
);
export const actorApi = new ActorService(
  API_URL ?? 'http://10.2.50.23:8080',
  JHeader,
);
export const scenariosApi = new ScenariosService(
  API_URL ?? 'http://10.2.50.23:8080',
  header,
);
export const scenarioApi = new ScenarioService(
  API_URL ?? 'http://10.2.50.23:8080',
  header,
);

export const caApi = new CaService(API_URL ?? 'http://10.2.50.23:8080', header);
export const certificateApi = new CertificatesService(
  API_URL ?? 'http://10.2.50.23:8080',
  header,
);
export const downloadApi = new DownloadService(
  API_URL ?? 'http://10.2.50.23:8080',
  header,
);
//--------------------------------------TYPE
export interface TypeCreateDoc {
  date: string;
  url: string;
}
export interface TypeActor {
  date: string;
  url: string;
}
export interface TypeUpload extends TypeActor {}
export interface TypeScenarioI extends TypeScenario {
  url: string;
}

export interface TypeOTP {
  date: Date;
  expires: Date;
  otp: string;
}

export interface TypeGCU {
  actor: string;
  authority: string;
  'download-url': string;
  session: string;
  token: string;
  version: string;
}
export interface TypeApprove {
  otp: string;
  signatures: Signature[];
  threadId: string;
}

export interface Signature {
  actor: string;
  document: string;
  signatureId: string;
  tag: string;
}
export interface TypeGenuine {
  date: Date;
  expires: Date;
  url: string;
}
export interface TypeCertificate extends TypeGenuine {}
