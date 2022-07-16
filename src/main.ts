/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 *
 * N.B. The entry file of your Massa Smart Contract program should be named
 * `src/main.ts`, the command `yarn bundle` will produce an `build/main.wasm`
 * which is ready to be send on Massa network node!
 **/

import { create_sc, include_base64, print, call, Context } from 'massa-sc-std'
import { swapTokenArgs } from './smart-contract'
import { JSON } from 'json-as'

export function main(_args: string): void {
  const bytes = include_base64('./build/smart-contract.wasm')
  let addr = create_sc(bytes)
  print('Address = ' + addr)
  // Here example of how to call a smart contract

// you will need to do an increaseAllowance before to proceed with the swap or the transaction will be reverted
// address 1 and 2 will need to increaseAllowance of tokenA and tokenB to the person who will call the contract 

  
  print(
    call(
      addr,
      'swapToken',
      JSON.stringify<swapTokenArgs>({
        tokenA: '0x',
        tokenB: '0x',
        address1: '0x',
        address2: '0x',
        amountA: 10,
        amountB: 20,
      }),
      0,
    ),
  )
  print(`${Context.get_call_stack()[0]}`)
}
