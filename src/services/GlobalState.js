import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  currency: false,
});

export const changeCurrency = () => {
    setGlobalState('currency', (v) => true);
};

// export const countDown = () => {
//     setCurrency('count', (v) => v - 1);
// };

export { useGlobalState };