import {
  documentApi,
  downloadApi,
  TypeGenuine,
} from '@screens/Interface/Docusign/page/Type';

interface Type {
  sesID: string;
  docSelected: string;
}
export async function StepAfterGenerateCertificate({sesID, docSelected}: Type) {
  const N_sesID = parseInt(sesID!);
  const ad = docSelected.split('/');
  const N_DocSelected = parseInt(ad[ad.length - 1]);
  try {
    const genus = await documentApi.getGenuineDocumentById<TypeGenuine>(
      N_sesID,
      N_DocSelected,
    );
    if (genus) {
      try {
        const download = await downloadApi.getContentDocumentSession(genus.url);
        if (download) {
          return download;
          // dispatch(setSourcePDF(download));
          // navigate.navigate(Constant_Navigator.PAGE_SIGN_DOCUSIGN);
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export default StepAfterGenerateCertificate;
