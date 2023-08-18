'use client'

import React from "react";
import { Web3Store } from "./web3.storage";

export const Web3Context = React.createContext<Web3Store | null>(null);

export default Web3Context;