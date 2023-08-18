import React from "react";
import useListenCoinFlipEvents from "./coinFlipListener";
import useDeployCoinFlip from "./deployCoinFlip";

export const useEventCallback = (provider,signer,name, callback, deps) => {
    
    const {readCoin} = useDeployCoinFlip(provider,signer);
    // eslint-disable-next-line
    //const memoizedCallback = React.useCallback(callback, deps);

  
    React.useEffect(() => {
      if (readCoin && provider) {
        console.log('event mounted');
        readCoin.on(name, callback);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, readCoin, callback]);
  };