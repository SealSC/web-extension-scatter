import {types, consts} from "@sealsc/web-extension-protocol";
import scatterTypes from "./types";

function isValidTable(wrapper, table) {
  return wrapper.abi.abi.tables.find(t=> t.name === table)
}

class ScatterContractCaller extends types.ExtensionContractCaller {
  async onChainCall(wrapper, methodName, param) {
    let accountResult = await this.extension.actions.getAccount()
    let account = accountResult.data

    let action = [{
      account: wrapper.address,
      name: methodName,
      authorization: [{
          actor: account.name,
          permission: account.authority
        }],
      data: param
    }]

    return await this.extension.eos.transaction({
      actions: action
    }).then(tx=>{
        return new types.Result(tx.transaction_id, consts.predefinedStatus.SUCCESS(tx))
      })
      .catch(reason => {
        return new types.Result(null, consts.predefinedStatus.UNKNOWN(reason))
      })
  }

  async offChainCall(wrapper, table, param = new scatterTypes.OffChainCallParam()) {
    if(!isValidTable(wrapper, table)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(table))
    }

    if(!(param instanceof scatterTypes.OffChainCallParam)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(param))
    }

    if(!param.scope) {
      let accountResult = await this.extension.actions.getAccount()
      param.scope = accountResult.data.name
    }

    let result = await this.extension.eos.getTableRows({
      code: wrapper.address,
      scope: param.scope,
      table: table,
      limit: param.limit,
      json:true
    }).catch(reason => {
      return consts.predefinedStatus.UNKNOWN(reason)
    })

    if(result instanceof types.Status) {
      return new types.Result(null, result)
    } else {
      return new types.Result(result, consts.predefinedStatus.SUCCESS())
    }
  }
}

export {
  ScatterContractCaller
}