import { expect } from 'chai';
import { ContractTransactionReceipt, EventLog } from 'ethers';
import { isBigInt } from './check-type.util';


// Ported from @openzeppelin/test-helpers to use with Ethers. The Test Helpers don't
// yet have Typescript typings, so we're being lax about them here.
// See https://github.com/OpenZeppelin/openzeppelin-test-helpers/issues/122

/* eslint-disable @typescript-eslint/no-explicit-any */

export function expectEvent({logs}: ContractTransactionReceipt, eventName: string, eventArgs = {}): any {

  if (logs == undefined) {
    throw new Error('No events found in receipt');
  }


  const events = logs.filter((e) => e.eventName === eventName);
  expect(events.length > 0).to.equal(true, `No '${eventName}' events found`);

  const exceptions: Array<string> = [];
  const event = events.find(function (e) {
    Object.values(eventArgs).forEach((value,i) => {
      try {
        if (e.args == undefined) {
          throw new Error('Event has no arguments');
        }

        contains(e.args, i, value);
      } catch (error:unknown) {
        if (error instanceof Error) exceptions.push(error.message);
        return false;
      }
    });
    return true;
  });

  if (event === undefined) {
    // Each event entry may have failed to match for different reasons,
    // throw the first one
    throw exceptions[0];
  }

  return event;
}

export function inIndirectReceipt(
  receipt: ContractReceipt,
  emitter: Interface,
  eventName: string,
  eventArgs = {},
  address?: string,
  amount?: number
): any {
  const expectedEvents = arrayFromIndirectReceipt(receipt, emitter, eventName, address);
  if (amount === undefined) {
    expect(expectedEvents.length > 0).to.equal(true, `No '${eventName}' events found`);
  } else {
    expect(expectedEvents.length).to.equal(
      amount,
      `${expectedEvents.length} '${eventName}' events found; expected ${amount}`
    );
  }

  const exceptions: Array<string> = [];
  const event = expectedEvents.find(function (e, i) {  
    for (const [k, v] of Object.entries(eventArgs)) {
      try {
        if (e.args == undefined) {
          throw new Error('Event has no arguments');
        }

        contains(e.args, i , v);
      } catch (error) {
        if (error instanceof Error) exceptions.push(error.message);
        return false;
      }
    }
    return true;
  });

  if (event === undefined) {
    // Each event entry may have failed to match for different reasons,
    // throw the first one
    throw exceptions[0];
  }

  return event;
}

export function notEmitted(receipt: ContractReceipt, eventName: string): void {
  if (receipt.events != undefined) {
    const events = receipt.events.filter((e) => e.event === eventName);
    expect(events.length > 0).to.equal(false, `'${eventName}' event found`);
  }
}

function arrayFromIndirectReceipt(
  receipt: ContractReceipt,
  emitter: Interface,
  eventName: string,
  address?: string
): any[] {
  const decodedEvents = receipt.logs
    .filter((log) => (address ? log.address.toLowerCase() === address.toLowerCase() : true))
    .map((log) => {
      try {
        return emitter.parseLog(log);
      } catch {
        return undefined;
      }
    })
    .filter((e): e is LogDescription => e !== undefined);

  return decodedEvents.filter((event) => event.name === eventName);
}

function contains(args: [any | undefined], i:number, value: any) {  

  if (value === null) {
    expect(args[i]).to.equal(null, `expected event argument '${i}' to be null but got ${args[i]}`);
  } else if (isBigInt(args[i]) || isBigInt(value)) {
    const actual = isBigInt(args[i]) ? args[i].toString() : args[i];
    const expected = isBigInt(value) ? value.toString() : value;

    expect(args[i]).to.equal(value, `expected event argument '${i}' to have value ${expected} but got ${actual}`);
  } else {
    expect(args[i]).to.be.deep.equal(
      value,
      `expected event argument '${i}' to have value ${value} but got ${args[i]}`
    );
  }
}


export async function inTransaction (receipt, tx, emitter, eventName, eventArgs = {}) {
  let abi;
  let address;

  const {logs} = receipt;
 // decodeLogs(receipt.tx.logs, emitter, eventName);

receipt.logs.forEach((log) => {
  console.log(emitter.interface.parseLog(log));
})


  let eventABI = receipt.events.filter(x => x.event === eventName);
  
  
  if (eventABI.length === 0) {
    throw new Error(`No ABI entry for event '${eventName}'`);
  } else if (eventABI.length > 1) {
    throw new Error(`Multiple ABI entries for event '${eventName}', only uniquely named events are supported`);
  }

  eventABI = eventABI[0];


  

  // The first topic will equal the hash of the event signature
  const eventSignature = `${eventName}(${eventABI.inputs.map(input => input.type).join(',')})`;
  const eventTopic = web3.utils.sha3(eventSignature);

  // Only decode events of type 'EventName'
  const decodedLogs =  logs
    .map(log => web3.eth.abi.decodeLog(eventABI.inputs, log.data, log.topics.slice(1)))
    .map(decoded => ({ event: eventName, args: decoded }));

    console.log(decodedLogs);
    

  return expectEvent(transactionReceipt, eventName, eventArgs);
}