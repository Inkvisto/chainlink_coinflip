'use client'
import React from "react";
import Eth from "./Eth";
import useDeployCoinFlip from "../../web3/hooks/deployCoinFlip";
import { formatEther } from "@ethersproject/units";
import { Button } from "@mui/material";
import { EventLog, ethers } from "ethers";
import { useWeb3Context } from "../../web3/zustand/context/web3.hook";

export const GameComponent = () => {
    const { provider, signer, account } = useWeb3Context((s) => s);
    const [eventData, setEventData] = React.useState<any>();
    const { coin, readCoin, coordinator } = useDeployCoinFlip(provider, signer);
    const [betAmount, setBet] = React.useState('0.01');
    const [profit, setProfit] = React.useState<bigint>(0n);
    const [balance, setBalance] = React.useState<any>();

    const getBalance = async () => {
        if (provider && account) {
            const result = await provider.getBalance(account);
            setBalance(result);
        }
    };

    const collectFunds = async () => {
        await (await coin.withdrawPlayerBalance()).wait();
        setProfit(0n);
        getBalance();
    };

    React.useEffect(() => {
        (async () => {
            if (readCoin && provider) {
                setProfit(await coin.getPlayerBalance());
                getBalance()
            }
        })()
    }, [provider, account, setProfit]);

    const handleBet = async (betChoice: number) => {
        const receipt = await (await coin.bet(betChoice, { value: ethers.parseEther(betAmount) })).wait();
        const eventLog = receipt?.logs[1] as EventLog;
        await (await coordinator.fulfillRandomWords(eventLog.args[1], coin.target)).wait();
        const filter = coin.filters.BetResult();
        const coinEvents = await readCoin.queryFilter(filter);
        const names = ['address', 'win', 'value'];
        coinEvents.forEach((e: any) => setEventData(Object.fromEntries(Object.entries(e.args).map((v, i) => [names[i], v[1]]))));
        getBalance();
        const currentBalance = await coin.getPlayerBalance();
        setProfit(currentBalance);
    };

    return (
        <div>
            <h2>Hi, {account && account.address.substring(0, 5) + "..." + account.address.substring(account.address.length - 5)}</h2>
            <p>Enter the amount to bet and pick your side!</p>
            <p
                style={{
                    fontStyle: "italic",
                    fontSize: "0.7em",
                    opacity: 0.91,
                }}
            >
                Note: the result might take up to a few minutes. Just go grab a coffee and relax, you will get notified once the
                flip is over.
            </p>
            <p>
                Account balance: <Eth>{balance && balance.toString()}</Eth> <br />
                Your profit:  <Eth>{profit.toString().slice(0, 4)}</Eth> {profit !== 0n && <Button onClick={collectFunds}>Collect</Button>}
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <input value={betAmount} onChange={(event) => setBet(event.currentTarget.value)} />
                <p
                    style={{
                        marginTop: 2,
                        fontStyle: "italic",
                        fontSize: "0.7em",
                        opacity: 0.91,
                    }}
                >
                    Minimum required bet: <Eth>0.001</Eth>
                </p>
                <>
                    <Button onClick={() => handleBet(0)}>
                        head
                    </Button>
                    <Button onClick={() => handleBet(1)}>
                        tail
                    </Button>
                </>
                {eventData && (profit !== 0n ? `You won ${profit && formatEther(eventData.value)} ETH!` : eventData.win ? 'Try your luck one more time' : `You lost ${betAmount} ETH. Let's try again!`)}

            </div>
        </div>
    );

};


