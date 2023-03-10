import {ArrowBackIcon, ArrowForwardIcon, Button, Text, View} from 'native-base';
import React from 'react';
import {SlideProps, useSlide} from '.';

export const Slide = ({
  slideContent,
  backgroundColor,
  height,
  width,
  headerStyle,
  button,
  onDone,
  onBack,
  onNext,
}: SlideProps) => {
  const {back, next, slide} = useSlide();
  const SlideContentCustom = ({index}: {index: number}) => {
    return <>{slideContent[index].child}</>;
  };

  return (
    <View
      backgroundColor={backgroundColor}
      height={height}
      width={width}
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <View height={'5%'}>
        <Text fontSize="xl" fontWeight="semibold" {...headerStyle}>
          {`${slideContent[slide.index].stepName}`}
        </Text>
      </View>
      <View
        py={2}
        width={'95%'}
        height={'80%'}
        display={'flex'}
        justifyContent="center"
        alignItems={'center'}
        alignContent="center"
      >
        <SlideContentCustom index={slide.index} />
      </View>
      <View
        width={'95%'}
        height={'10%'}
        display="flex"
        justifyContent={'space-between'}
        flexDir="row"
        alignItems={'center'}
      >
        <Button
          width={'45%'}
          {...button?.leftButton}
          disabled={slide.isFirst}
          isDisabled={slide.isFirst}
          onPress={() => {
            back();
            onBack && onBack(slide);
          }}
        >
          <ArrowBackIcon />
        </Button>
        {slide.isLast ? (
          <Button
            width={'45%'}
            {...button?.lastStepButton}
            onPress={() => onDone && onDone(slide)}
          >
            Done
          </Button>
        ) : (
          <Button
            width={'45%'}
            {...button?.rightButton}
            disabled={slide.isLast}
            isDisabled={slide.isLast}
            onPress={() => {
              next();
              onNext && onNext(slide);
            }}
          >
            <ArrowForwardIcon />
          </Button>
        )}
      </View>
    </View>
  );
};
