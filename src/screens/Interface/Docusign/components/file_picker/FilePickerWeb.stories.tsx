import {ComponentMeta, ComponentStory} from '@storybook/react';
import {View} from 'native-base';
import React from 'react';
import {FilePickerWeb} from './';

export default {
  title: 'Commons/FilePicker/Web',
  component: FilePickerWeb,
} as ComponentMeta<typeof FilePickerWeb>;

const Template: ComponentStory<typeof FilePickerWeb> = args => (
  <View width={'100%'} height={'500px'}>
    <FilePickerWeb {...args} />
  </View>
);

export const FilePicker = Template.bind({});
FilePicker.args = {};
