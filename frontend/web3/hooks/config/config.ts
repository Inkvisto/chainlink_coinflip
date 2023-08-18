export type CreateConfigParameters = {
    autoConnect?:boolean,
    logger?: any,
    connectors?:any,
    publicClient?:any,
    storage?: any,
    webSocketPublicClient?:any
}

const Config:CreateConfigParameters = {
    autoConnect:false,
}