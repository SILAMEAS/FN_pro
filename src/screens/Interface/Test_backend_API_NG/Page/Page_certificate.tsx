import Mobile_pdf from '@src/components/compoents(ms)/moblie_componens/Moblie_pdf';
import {setCert_ng, setData_signature} from '@src/redux/counter/CounterSlice';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  Skeleton,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {download, recover_manifest} from '../service/manifest';
import {close_session} from '../service/sessions';
import {sign_with_certificate} from '../service/signature';
import {Download_pdf} from '@screens/Interface/Test_backend_API_NG/service/document/download/before_close_session';
import {useAppDispatch, useAppSelector} from '@src/redux/config/hooks';
// loading skeleton
const LoadingSkeleton = () => {
  return (
    <Center w="350">
      <VStack
        w="90%"
        maxW="400"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
      >
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    </Center>
  );
};

//modal close session
function Modal_CloseSession({Close, setClose, x, id_did}: any) {
  console.log(id_did + '------------');
  const s = false;
  const [buffer, setBuffer] = useState('');
  return (
    <>
      <Modal
        isOpen={Close}
        onClose={() => setClose(false)}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            {buffer !== '' ? (
              <Text color={'black'} fontWeight={'bold'}>
                Document downloaded
              </Text>
            ) : (
              <Text color={'black'} fontWeight={'bold'}>
                Alert
              </Text>
            )}
          </Modal.Header>
          <Modal.Body>
            Do you want to download doc before Close session?
          </Modal.Body>
          {s && <LoadingSkeleton />}

          <Modal.Footer>
            {buffer !== '' ? (
              <Box w={'100%'} h={'100%'}>
                <Mobile_pdf data={buffer} />
              </Box>
            ) : (
              <HStack w={'100%'} justifyContent={'space-around'}>
                <Button
                  w={'30%'}
                  onPress={async () => {
                    const data = await Download_pdf(id_did);
                    data && setBuffer(data);
                  }}
                >
                  Yes
                </Button>
                <Button
                  bg={'red.500'}
                  w={'30%'}
                  onPress={() => {
                    close_session(x);
                  }}
                >
                  No
                </Button>
              </HStack>
            )}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
function Modal_DL({
  modalVisible,
  setModalVisible,
  dataManifest: dataMiniFest,
}: any) {
  const [pdf, setPdf]: any = React.useState();
  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Do you want to download this manifest?</Modal.Header>
          <Modal.Body>
            <VStack>
              <Text color={'black'} fontWeight={'bold'}>
                Date : {dataMiniFest?.date}
              </Text>
              <Text color={'black'} fontWeight={'bold'}>
                Expires : {dataMiniFest?.expires}
              </Text>
              <Text color={'black'} fontWeight={'bold'}>
                URL for download : {dataMiniFest?.url}
              </Text>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <HStack w={'100%'} space={5}>
              <Button
                bg={'red.600'}
                flex="1"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                flex="1"
                onPress={async () => {
                  const data = await download(dataMiniFest.url);
                  setPdf(data);
                }}
              >
                Download
              </Button>
            </HStack>
            <Box mt={10} width={'100%'} h={'70%'}>
              {pdf ? <Mobile_pdf data={pdf} /> : <></>}
            </Box>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
function ActionSheetL(Data_signature: any) {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [modalVisible, setModalVisible] = useState(false);
  const [dataManifest, setDataManifest] = useState();
  const [Close, setClose] = useState(false);
  console.log(' ActionSheetL');
  console.log(Data_signature);
  return (
    <Center>
      <Modal_DL
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dataMinifest={dataManifest}
      />
      <Button onPress={onOpen}>Click me</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          _dragIndicatorWrapperOffSet={{
            py: '10',
          }}
        >
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}
            >
              Details signatures
            </Text>
            <HStack>
              <Button
                bg={'red.800'}
                onPress={() => {
                  setClose(true);
                }}
              >
                Close Session
              </Button>
              <Button
                bg={'blue.800'}
                onPress={async () => {
                  const data = await recover_manifest(
                    Data_signature.Data_signature.signatures[0].actor.split(
                      '/',
                    )[4],
                  );
                  console.log('--------0000000000000');
                  console.log(data);
                  setDataManifest(data);
                  setModalVisible(true);
                }}
              >
                Recover
              </Button>
            </HStack>
          </Box>

          <Actionsheet.Item>
            ThreadId : {Data_signature.Data_signature.threadId}
          </Actionsheet.Item>
          <Actionsheet.Item>
            Token :{Data_signature.Data_signature.token}
          </Actionsheet.Item>
          <Actionsheet.Item>
            Actor : {Data_signature.Data_signature.signatures[0].actor}
          </Actionsheet.Item>
          <Actionsheet.Item>
            Document : {Data_signature.Data_signature.signatures[0].document}
          </Actionsheet.Item>
          <Actionsheet.Item>
            Tag : {Data_signature.Data_signature.signatures[0].tag}
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Modal_CloseSession
        Close={Close}
        setClose={setClose}
        x={Data_signature.Data_signature.signatures[0].actor.split('/')[4]}
        id_did={Data_signature.Data_signature.signatures[0].document}
      />
    </Center>
  );
}
const Page_certificate = () => {
  const {Data_certificate} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  const {doc_ng, cert_ng, actor_ng} = useAppSelector(state => state.counter);
  const sign_doc = () => {
    const data = Data_certificate.url;
    dispatch(setCert_ng(data));
  };
  const {Data_signature} = useAppSelector(state => state.counter);
  console.log(' ===========================================================');
  console.log(Data_signature);
  return (
    <Box h={'100%'}>
      <VStack>
        <Heading mx={'auto'} py={10}>
          Certificate
        </Heading>
        <Box bg={'blue.800'} rounded={'lg'} p={10}>
          <Text color={'white'}>Date : {Data_certificate.date}</Text>
          <Text color={'white'}>Expires : {Data_certificate.expires}</Text>
          <Text color={'white'}>URL : {Data_certificate.url}</Text>
          <HStack mx={'auto'} mt={'10%'} space={5}>
            <Button onPress={sign_doc} bg={'red.700'}>
              click before signature
            </Button>

            <Button
              onPress={async () => {
                const data = await sign_with_certificate({
                  doc: doc_ng,
                  ac: actor_ng,
                  ce: cert_ng,
                });
                dispatch(setData_signature(data));
              }}
            >
              Signature
            </Button>
          </HStack>
        </Box>
      </VStack>
      <ActionSheetL Data_signature={Data_signature} />
    </Box>
  );
};

export default Page_certificate;
