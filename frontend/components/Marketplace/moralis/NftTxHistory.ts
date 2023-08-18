import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

export const useTransactionHistory = async () => {
  if (!Moralis.Core.isStarted) await Moralis.start({
    apiKey: "BRu68fdwvwam8dcfMyiG5qEBlUnoAvIPXtv9BqvbMi7yzqLZIRV5NTs2p2UG1sSi",
  });

  const address = "0x86Db4ED875EE8Ba56FF3C66E359B2c79473b09eF";

  const tokenId = "1";

  const chain = EvmChain.SEPOLIA;

  const response = await Moralis.EvmApi.nft.getNFTTransfers({
    address,
    tokenId,
    chain,
  });

 return  response.toJSON();
};

export default useTransactionHistory;