import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import {types, consts} from "@sealsc/web-extension-protocol";

let installed = null

class ScatterChecker extends types.ExtensionChecker {
  async installed() {
    if(null === installed) {
      ScatterJS.plugins(new ScatterEOS())
      installed = await ScatterJS.scatter.connect("sealsc")
    }

    return installed ?
      new types.Result(true, consts.predefinedStatus.SUCCESS()) :
      new types.Result(false, consts.predefinedStatus.NOT_SPECIFIED_EXTENSION())
  }

  async isLogin() {
    let checkInstall = await this.installed()
    if(!checkInstall.data) {
      return checkInstall
    }

    return ScatterJS.scatter.identity ?
      new types.Result(true, consts.predefinedStatus.SUCCESS()) :
      new types.Result(false, consts.predefinedStatus.NOT_LOGIN())
  }
}

export {
  ScatterChecker
}