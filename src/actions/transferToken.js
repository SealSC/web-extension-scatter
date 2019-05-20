import {types, consts, utils} from "@sealsc/web-extension-protocol";
import scatterTypes from "../types";

function buildAmount(amount, supply, symbol) {
  let precision = 0
  let supplySegment = supply.split('.')
  if(1 === supplySegment.length) {
    precision = 0
  } else if(2 === supplySegment.length) {
    precision = supplySegment[1].length
  }

  amount = utils.toFixedDown(amount, precision)

  return `${amount} ${symbol}`
}

async function transferToken(wrapper, to, amount, extra) {
  if(!(extra instanceof scatterTypes.TransferTokenExtraInfo)) {
    return new types.Result(null, consts.predefinedStatus.BAD_PARAM(extra))
  }

  if('string' !== typeof amount) {
    if(!(extra instanceof scatterTypes.TransferTokenExtraInfo)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM([amount,extra]))
    }
    let tokenInfo = await this.extension.eos.getCurrencyStats(wrapper.address, extra.symbol)
    if(!tokenInfo[extra.symbol]) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM([wrapper, extra]))
    }
    amount = buildAmount(amount, tokenInfo[extra.symbol].max_supply.split(' ')[0], extra.symbol)
  }

  let contractCaller = this.extension.contractCaller
  let accountResult = await this.extension.actions.getAccount()
  let account = accountResult.data

  return await contractCaller.onChainCall(
    wrapper,
    'transfer',
    {
      from: account.name,
      to: to,
      quantity: amount,
      memo: extra.memo
    },
  )
}

export {
  transferToken
}