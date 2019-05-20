import {types, consts} from "@sealsc/web-extension-protocol";

async function getAccount() {
  if(!Array.isArray(this.extension.webjsInstance.identity.accounts) || 0 === this.extension.webjsInstance.identity.accounts.length) {
    return new types.Result(null, consts.predefinedStatus.NOT_LOGIN())
  }

  let account = this.extension.webjsInstance.identity.accounts.find(a => a.blockchain === 'eos')
  if(!account) {
    return new types.Result(null, consts.predefinedStatus.NO_ACCOUNT(null))
  }
  return new types.Result(account, consts.predefinedStatus.SUCCESS(null))
}

export {
  getAccount
}