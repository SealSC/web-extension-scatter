import {types, consts} from "@sealsc/web-extension-protocol";
import ScatterJS from "scatterjs-core"

class ScatterConnector extends types.ExtensionConnector {
  async link(network) {
    let checkInstall = await this.extension.checker.installed()
    if(!checkInstall.data) {
      return checkInstall
    }

    network = network || this.extension.network
    return ScatterJS.scatter.getIdentity({accounts:[network]})
      .then(()=>{
        let account = this.extension.webjsInstance.identity.accounts.find(a => a.blockchain === 'eos')
        if(!account) {
          return new types.Result(null, consts.predefinedStatus.NO_ACCOUNT(null))
        }
        return new types.Result(account, consts.predefinedStatus.SUCCESS(null))
      })
      .catch(reason => {
        return new types.result(null, consts.predefinedStatus.NOT_LOGIN(reason))
      })
  }

  async unlink() {
    let checkInstall = await this.extension.checker.installed()
    if(!checkInstall.data) {
      return checkInstall
    }

    try {
      await ScatterJS.scatter.forgetIdentity()
        .catch(reason=>{
          //do nothing
          console.log(reason)
        })
    } catch (reason) {
      console.log("unlink throw: ", reason)
    }

    return new types.Result(true, consts.predefinedStatus.SUCCESS(null))
  }
}

export {
  ScatterConnector
}