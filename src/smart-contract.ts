/** ***********************
 * Smart contract exporting a public function `helloworld`
 *
 * N.B. The entry file of your AssemblyScript program should be named
 * `src/smart-contract.ts`, the command `yarn build` will produce an
 * `build/smart-contract.wasm` WASM binary!
 **/

import { JSON } from 'json-as'
import { call, print } from 'massa-sc-std'


@json
class transferFromArgs {
  ownerAccount: string = '';
  recipientAccount: string = '';
  nbTokens: u64 = 0;
}

@json
export class swapTokenArgs {
  tokenA: string = '';
  tokenB: string = '';
  address1: string = '';
  address2: string = '';
  amountA: u64 = 0;
  amountB: u64 = 0;
}

export function swapToken(_args: string): string {
  const args = JSON.parse<swapTokenArgs>(_args)
  print(
    'swapping ' +
      args.amountA +
      'of ' +
      args.tokenA +
      ' with ' +
      args.amountB +
      ' of ' +
      args.tokenB,
  )
  call(
    args.tokenA,
    'transferFrom',
    JSON.stringify<transferFromArgs>({
      ownerAccount: args.address1,
      recipientAccount: args.address2,
      nbTokens: args.amountA,
    }),
    0,
  )
  call(
    args.tokenB,
    'transferFrom',
    JSON.stringify<transferFromArgs>({
      ownerAccount: args.address2,
      recipientAccount: args.address1,
      nbTokens: args.amountB,
    }),
    0,
  )
  return 'swap done'
}
