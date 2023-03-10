import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  PropsWithChildren,
  useCallback,
} from 'react';

type ActionType = {type: 'NEXT'} | {type: 'BACK'};

export interface Slide {
  index: number;
  totalSteps: number;
  isLast: boolean;
  isFirst: boolean;
}

type UseSlideManagerResult = ReturnType<typeof useSlideManager>;

const SlideContext = createContext<UseSlideManagerResult>({
  slide: {index: 0, totalSteps: 0, isFirst: true, isLast: false},
  next: () => {},
  back: () => {},
});

function useSlideManager(initialSlide: Slide): {
  slide: Slide;
  next: () => void;
  back: () => void;
} {
  const [slide, dispatch] = useReducer((state: Slide, action: ActionType) => {
    switch (action.type) {
      case 'NEXT':
        state.isFirst = false;
        if (state.index === state.totalSteps - 1) {
          return {...state};
        }

        state.isLast = state.index + 1 === state.totalSteps - 1;
        return {...state, index: state.index + 1};
      case 'BACK':
        state.isLast = false;
        if (state.index <= 0) {
          return {...state};
        }

        state.isFirst = state.index - 1 === 0;
        return {...state, index: state.index - 1};

      default:
        throw new Error('Type unknown!');
    }
  }, initialSlide);
  const next = useCallback(() => {
    dispatch({
      type: 'NEXT',
    });
  }, []);

  const back = useCallback(() => {
    dispatch({
      type: 'BACK',
    });
  }, []);

  // const done = useCallback((callback: any) => {
  //   typeof callback === 'function' && $ok(callback) && callback();
  // }, []);
  return {slide, next, back};
}

export const SlideProvider: React.FunctionComponent<
  PropsWithChildren<{initialSlide: Slide}>
> = ({initialSlide, children}) => (
  <SlideContext.Provider value={useSlideManager(initialSlide)}>
    {children}
  </SlideContext.Provider>
);

export const useSlide = () => {
  const {slide, back, next} = useContext(SlideContext);

  const toast = useMemo(
    () => ({
      back,
      next,
      slide,
    }),
    [slide, back, next],
  );

  return toast;
};
