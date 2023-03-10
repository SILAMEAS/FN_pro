import {sessionApi} from '@screens/Interface/Docusign/page/Type';
import {type_forSign} from '@src/redux/counter/CounterSlice';
interface Type {
  ForSign: type_forSign;
  option: 'server' | 'generate';
}
export async function SignOption({ForSign, option}: Type) {
  const data = await sessionApi.signDocument(
    ForSign.IdSession + '/sign-documents' ?? '',
    {
      actor: ForSign.Actor!,
      documents: [ForSign.Document!],
      certificate: ForSign.Certificate!,
      tag: 'cosign',
      signMode: option,
    },
  );
  console.log(data);
}

export default SignOption;
