import React, {ReactNode} from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  ListRenderItemInfo,
} from 'react-native';
import {Box, IBoxProps, Text, View} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Swiper} from '@screens/Interface/Docusign/color/Color';
import ActivityInfo from '@screens/Interface/Docusign/components/ActivityInfo';
interface type {
  title: ReactNode;

  icon: ReactNode;
  footer: ReactNode;
  subTitle: ReactNode;
  prop?: IBoxProps;
}
interface Type {
  data: type[] | undefined;
}
export default function SwiperList({data}: Type) {
  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  // const deleteRow = (rowMap: any, rowKey: any) => {
  //   closeRow(rowMap, rowKey);
  //   const newData = [...listData];
  //   const prevIndex = listData.findIndex(item => item.key === rowKey);
  //   newData.splice(prevIndex, 1);
  //   setListData(newData);
  // };

  const onRowDidOpen = (rowKey: any) => {
    console.log('This row opened', rowKey);
  };

  const renderItem = (item: ListRenderItemInfo<type>) => (
    <TouchableHighlight
      onPress={() => console.log('You touched me' + data)}
      style={[Swiper.rowFront]}
      underlayColor={'#AAA'}
    >
      <ActivityInfo
        title={item.item.title}
        icon={item.item.icon}
        footer={item.item.footer}
        meaning={item.item.subTitle}
        prop={item.item.prop}
      />
    </TouchableHighlight>
  );

  const renderHiddenItem = (data: any, rowMap: any) => (
    <View style={Swiper.rowBack}>
      <Text color={'blue.300'}>Detail</Text>
      <TouchableOpacity
        style={[Swiper.backRightBtn, Swiper.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Text color={'white'}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[Swiper.backRightBtn, Swiper.backRightBtnRight]}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Box w={'100%'}>
      <SwipeListView
        data={data}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
}
