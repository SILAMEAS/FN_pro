import {Box, Center, HStack, IBoxProps, Text} from 'native-base';
import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import {useCountdown} from './hook/useCountdown';
interface type {
  targetDate: number;
  prop: IBoxProps;
}

export const CountdownTimer = ({targetDate, prop}: type) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  if (days === 0 && hours === 0 && minutes === 0 && seconds == 0) {
  }

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <Box {...prop}>
        <Center>
          <ShowCounter
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        </Center>
      </Box>
    );
  }
};
const ExpiredNotice = () => {
  return (
    <Box>
      <Text>Expired!!!</Text>
      <Text>Please select a future date and time.</Text>
    </Box>
  );
};
const ShowCounter = ({days, hours, minutes, seconds}: any) => {
  return (
    <Box>
      <HStack>
        <DateTimeDisplay value={days} type={'day'} isDanger={days <= 3} />

        <DateTimeDisplay value={hours} type={'hour'} isDanger={false} />

        <DateTimeDisplay value={minutes} type={'min'} isDanger={false} />

        <DateTimeDisplay value={seconds} type={'s'} isDanger={false} />
      </HStack>
    </Box>
  );
};
