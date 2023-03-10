import {
  Button,
  useColorMode,
  useColorModeValue,
  Pressable,
  Modal,
  FormControl,
  Input,
  HStack,
  Stack,
  ScrollView,
  Box,
} from 'native-base';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from '@src/components/compoents(ms)/card/Card';
// Constant_Navigator.host
// const Constant_Navigator.host = 'http://10.2.50.9:3001';
// import Card from '../../components/SilaComponents/Card';
import {setDATA, setOne} from '@src/redux/counter/CounterSlice';
import {Constant_Navigator} from '../../navigation/Constant_Navigator';

// add user
function AddUser({
  name,
  email,
  setname,
  setemail,
  role,
  setrole,
  passWord,
  setPassword,
}: any) {
  const datas: any = useSelector((state: any) => state.counter.DATA);
  const [modalVisible, setModalVisible] = React.useState(false);
  const displach = useDispatch();
  console.log('ADDUSER');
  const AddUser = async () => {
    const dataa = {
      password: passWord,
      name,
      email,
      userRole: role,
    };
    console.log('-----------------00000000');
    console.log(dataa);
    const res = await fetch(Constant_Navigator.host + '/user/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(dataa),
    });
    const data = await res.json();
    console.log(data);
    if (data.message === 'T') {
      setModalVisible(false);
      displach(setDATA([...datas, data.user]));
      console.log('Done');
      console.log(datas);
    } else {
      alert('fail');
    }
  };
  return (
    <>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>New User</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                value={name}
                onChangeText={val => setname(val)}
                _light={{
                  bg: 'blue.900',
                  _hover: {
                    bg: 'Gray.200',
                  },
                  _focus: {
                    bg: 'Gray.200:alpha.70',
                  },
                }}
                _dark={{
                  bg: 'Gray.800',
                  _hover: {
                    bg: 'Gray.900',
                  },
                  _focus: {
                    bg: 'Gray.900:alpha.70',
                  },
                }}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={email}
                onChangeText={val => setemail(val)}
                maxLength={16}
                _light={{
                  bg: 'blue.900',
                  _hover: {
                    bg: 'Gray.200',
                  },
                  _focus: {
                    bg: 'Gray.200:alpha.70',
                  },
                }}
                _dark={{
                  bg: 'Gray.800',
                  _hover: {
                    bg: 'Gray.900',
                  },
                  _focus: {
                    bg: 'Gray.900:alpha.70',
                  },
                }}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Role</FormControl.Label>
              <Input
                value={role}
                onChangeText={val => setrole(val)}
                maxLength={16}
                _light={{
                  bg: 'blue.900',
                  _hover: {
                    bg: 'Gray.200',
                  },
                  _focus: {
                    bg: 'Gray.200:alpha.70',
                  },
                }}
                _dark={{
                  bg: 'Gray.800',
                  _hover: {
                    bg: 'Gray.900',
                  },
                  _focus: {
                    bg: 'Gray.900:alpha.70',
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                value={passWord}
                onChangeText={val => setPassword(val)}
                _light={{
                  bg: 'blue.900',
                  _hover: {
                    bg: 'Gray.200',
                  },
                  _focus: {
                    bg: 'Gray.200:alpha.70',
                  },
                }}
                _dark={{
                  bg: 'Gray.800',
                  _hover: {
                    bg: 'Gray.900',
                  },
                  _focus: {
                    bg: 'Gray.900:alpha.70',
                  },
                }}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={AddUser}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Button
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        Add user
      </Button>
    </>
  );
}
//update user
const Update = ({
  modalVisible,
  setModalVisible,
  email,
  name,
  setname,
  setemail,
  id,
}: any) => {
  // modal one of user
  const {GetOne}: any = useSelector((state: any) => state.counter);

  const Update = async (id: any) => {
    // const datas: any = useSelector((state: any) => state.counter.DATA);
    // const displact = useDispatch();

    const dataa = {
      name,
      email,
    };
    console.log(id);
    const res = await fetch(Constant_Navigator.host + '/user/update/' + id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(dataa),
    });
    const data = await res.json();
    console.log(data);

    if (data) {
      setModalVisible(false);
    }
  };
  return (
    <>
      {/* Profile Detail */}
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Profile Details {id}</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Names</FormControl.Label>
              <Input
                value={GetOne.name}
                onChangeText={val => setname(val)}
                colorScheme="red"
                _light={{
                  bg: 'blue.900',
                  _hover: {
                    bg: 'Gray.200',
                  },
                  _focus: {
                    bg: 'Gray.200:alpha.70',
                  },
                }}
                _dark={{
                  bg: 'Gray.800',
                  _hover: {
                    bg: 'Gray.900',
                  },
                  _focus: {
                    bg: 'Gray.900:alpha.70',
                  },
                }}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={GetOne.email}
                onChangeText={val => setemail(val)}
                _light={{
                  bg: 'blue.900',
                  _hover: {
                    bg: 'Gray.200',
                  },
                  _focus: {
                    bg: 'Gray.200:alpha.70',
                  },
                }}
                _dark={{
                  bg: 'Gray.800',
                  _hover: {
                    bg: 'Gray.900',
                  },
                  _focus: {
                    bg: 'Gray.900:alpha.70',
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Tel</FormControl.Label>
              <Input
                value={GetOne.phone}
                onChangeText={val => setname(val)}
                colorScheme="red"
                _light={{
                  bg: 'blue.900',
                  _hover: {
                    bg: 'Gray.200',
                  },
                  _focus: {
                    bg: 'Gray.200:alpha.70',
                  },
                }}
                _dark={{
                  bg: 'Gray.800',
                  _hover: {
                    bg: 'Gray.900',
                  },
                  _focus: {
                    bg: 'Gray.900:alpha.70',
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Age</FormControl.Label>
              <Input
                value={`${GetOne.age}`}
                onChangeText={val => setname(val)}
                colorScheme="red"
                _light={{
                  bg: 'blue.900',
                  _hover: {
                    bg: 'Gray.200',
                  },
                  _focus: {
                    bg: 'Gray.200:alpha.70',
                  },
                }}
                _dark={{
                  bg: 'Gray.800',
                  _hover: {
                    bg: 'Gray.900',
                  },
                  _focus: {
                    bg: 'Gray.900:alpha.70',
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>UserRole</FormControl.Label>
              <Input
                value={GetOne.userRole}
                onChangeText={val => setname(val)}
                colorScheme="red"
                _light={{
                  bg: 'blue.900',
                  _hover: {
                    bg: 'Gray.200',
                  },
                  _focus: {
                    bg: 'Gray.200:alpha.70',
                  },
                }}
                _dark={{
                  bg: 'Gray.800',
                  _hover: {
                    bg: 'Gray.900',
                  },
                  _focus: {
                    bg: 'Gray.900:alpha.70',
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Address</FormControl.Label>
              <Input
                value={GetOne.address}
                onChangeText={val => setname(val)}
                colorScheme="red"
                _light={{
                  bg: 'blue.900',
                  _hover: {
                    bg: 'Gray.200',
                  },
                  _focus: {
                    bg: 'Gray.200:alpha.70',
                  },
                }}
                _dark={{
                  bg: 'Gray.800',
                  _hover: {
                    bg: 'Gray.900',
                  },
                  _focus: {
                    bg: 'Gray.900:alpha.70',
                  },
                }}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  Update(id);
                }}
              >
                Update
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
interface Props {
  navigation: any;
}
const CRUD = ({navigation}: Props) => {
  const {GetOne}: any = useSelector((state: any) => state.counter);
  const [name, setname] = React.useState('');
  const [email, setemail] = React.useState('');
  const [passWord, setPassword] = React.useState('');

  const [role, setrole] = React.useState('USER');
  const datas: any = useSelector((state: any) => state.counter.DATA);

  const displact = useDispatch();
  // mode light or dark
  const {toggleColorMode} = useColorMode();
  // const text = useColorModeValue('Light', 'Dark');
  const bg = useColorModeValue('warmGray.50', 'coolGray.800');
  // get all users
  const GetData = async () => {
    try {
      const res = await fetch(Constant_Navigator.host + '/user');
      const data = await res.json();
      displact(setDATA(data));
      // console.log(data);
    } catch (error) {
      alert(error);
    }
  };
  const [modalVisible, setModalVisible] = React.useState(false);
  // get one data
  const GetId = (i: any) => {
    displact(setOne(i));
    setname(i.name);
    setemail(i.email);
    setPassword(i.password);
    setModalVisible(!modalVisible);
  };
  // run first when open in component
  useEffect(() => {
    console.log('GEtData');
    GetData();
  }, [modalVisible]);
  return (
    <Box h={'100%'}>
      <ScrollView bg={bg} h={'80%'} w={'100%'} mx={'auto'} overflowY="scroll">
        {datas.map((item: any) => {
          return (
            <Box key={item.id}>
              <Pressable
                h={[170, '25%']}
                onPress={() => {
                  GetId(item);
                }}
              >
                <Card
                  name={item.name}
                  email={item.email}
                  id={item.id}
                  role={item.userRole}
                />
              </Pressable>
            </Box>
          );
        })}

        <Update
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          name={name}
          setname={setname}
          email={email}
          setemail={setemail}
          id={GetOne.id}
        />
      </ScrollView>
      <Stack h={'25%'} width={'100%'}>
        <Box bg={'gray.400'} h={'100%'}>
          <HStack w="100%" h={'50%'} mb={2}>
            <Button
              onPress={toggleColorMode}
              size="sm"
              mt="10"
              mx="auto"
              fontSize={12}
              w={[24, 24, 48]}
              h={[12, 12, 12]}
            >
              Change mode
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('Interface_cal');
              }}
              mt="10"
              mx="auto"
            >
              Calculator
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('View_PDF');
              }}
              mt="10"
              mx="auto"
            >
              PDF
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('Interface_facebook');
              }}
              mt="10"
              mx="auto"
              bg={'red.600'}
              color={'white'}
            >
              Log out
            </Button>
          </HStack>
          <AddUser
            name={name}
            passWord={passWord}
            setPassword={setPassword}
            setname={setname}
            email={email}
            setemail={setemail}
            role={role}
            setrole={setrole}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default CRUD;
