import {types, consts, utils} from "@sealsc/web-extension-protocol";

async function transfer(to, amount, memo) {
  let accountResult = await this.extension.actions.getAccount()
  let account = accountResult.data

  const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };

  amount = utils.toFixedDown(amount, 4)
  return await this.extension.eos.transfer(account.name, to, `${amount} EOS`, memo, transactionOptions)
    .then(tx=>{
      return new types.Result(tx.transaction_id, consts.predefinedStatus.SUCCESS(tx))
    })
    .catch(reason => {
      return new types.Result(null, consts.predefinedStatus.UNKNOWN(reason))
    })
}

export {
  transfer
}