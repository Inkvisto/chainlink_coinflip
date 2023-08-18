import events from "events"

import { Chain } from "../chains/types"
import { mainnet, goerli } from "../chains"
import { AddressLike, Provider } from "ethers"


export type ConnectorData = {
    account?: AddressLike
    chain?: { id: number; unsupported: boolean }
  }


export interface ConnectorEvents {
    change(data: ConnectorData): void
    connect(config?: {
        chainId?: number
      }): void
    message({ type, data }: { type: string; data?: unknown }): void
    disconnect(): void
    error(error: Error): void
  }

  

/*
export abstract class Connector extends events.EventEmitter implements ConnectorEvents {
  
  abstract readonly id: string

  abstract readonly name: string
 
  readonly chains: Chain[]

  readonly options: any
 
  protected storage?: Storage

  abstract readonly ready: boolean



  constructor({
    chains = [mainnet, goerli],
    options,
  }: {
    chains?: Chain[]
    options: any
  }) {
    super()
    this.chains = chains
    this.options = options
  }



  abstract connect(config?: {
    chainId?: number
  }): Promise<Required<ConnectorData>>
  abstract disconnect(): Promise<void>
  abstract getAccount(): Promise<AddressLike>
  abstract getChainId(): Promise<number>
  abstract getProvider(config?: { chainId?: number }): Promise<Provider>
  abstract getWalletClient(config?: { chainId?: number }): Promise<any>
  abstract isAuthorized(): Promise<boolean>
  switchChain?(chainId: number): Promise<Chain>
  watchAsset?(asset: {
    address: string
    decimals?: number
    image?: string
    symbol: string
  }): Promise<boolean>

  protected abstract onAccountsChanged(accounts: AddressLike[]): void
  protected abstract onChainChanged(chain: number | string): void
  protected abstract onDisconnect(error: Error): void

  protected getBlockExplorerUrls(chain: Chain) {
    const { default: blockExplorer, ...blockExplorers } =
      chain.blockExplorers ?? {}
    if (blockExplorer)
      return [
        blockExplorer.url,
        ...Object.values(blockExplorers).map((x) => x.url),
      ]
  }

  protected isChainUnsupported(chainId: number) {
    return !this.chains.some((x) => x.id === chainId)
  }
}''*/