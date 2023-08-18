
/*

export type InjectedConnectorOptions = {

    name?: string | ((detectedName: string | string[]) => string)

    getProvider?: () => WindowProvider | undefined

    shimDisconnect?: boolean
}

type ConnectorOptions = InjectedConnectorOptions &
    Required<Pick<InjectedConnectorOptions, 'getProvider'>>

export class InjectedConnector extends Connector {

    readonly id: string = 'injected';
    readonly name: string;
    readonly ready: boolean;
    protected connectedKey = `${this.id}.shimDisconnect`

    constructor({ chains, options: options_ }: {
        chains?: Chain[]
        options?: InjectedConnectorOptions
    } = {}) {
        // default options

        const options = {
            name: '',
            ready: false,
            connected: true,
            getProvider(provider_name?: string) {

                if (typeof window === 'undefined') return;

                let provider = window.ethereum;

                //check for wallets extensions, default uses metamask
                if (Array.isArray(window.ethereum.providers)) {
                    provider_name ? provider = window.ethereum.providers.find((provider: any) => provider[provider_name]) : provider = window.ethereum.providers[0];
                }


                return provider;

            },
            //...options_

        }

        super({ chains, options })

        const provider = options.getProvider();

        this.name = options.name;
        this.ready = !!provider;
    }


    protected isUserRejectedRequestError(error: unknown) {
        return (error as ProviderRpcError).code === 4001
    }




    async connect({ chainId }: { chainId?: number } = {}) {
        try {
            const provider = await this.getProvider();
            if (!provider) throw new ConnectorNotFoundError()

            if (provider.on) {
                provider.on('accountsChanged', this.onAccountsChanged)
                provider.on('chainChanged', this.onChainChanged)
                provider.on('disconnect', this.onDisconnect)
            }

            this.emit('message', { type: 'connecting' })


            const accounts = await provider.request({
                method: 'eth_requestAccounts',
            })
            const account = getAddress(accounts[0] as string);
            let id = await this.getChainId();
            let unsupported = this.isChainUnsupported(id);

            if (this.options.connected)
                this.storage?.set(this.connectedKey, true);


            return { account, chain: { id, unsupported } }
        } catch (e) {
            if (this.isUserRejectedRequestError(e))
                throw new UserRejectedRequestError(e as Error)
            if ((e as ProviderRpcError).code === -32002)
                throw new ResourceNotFoundRpcError(e as ProviderRpcError)
            throw e
        }
    }




}*/