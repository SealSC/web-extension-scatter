import ScatterJS from "scatterjs-core"
import Eos from "eosjs"
import {ScatterChecker} from "./checker";
import {ScatterConnector} from "./connector";
import {ScatterActions} from "./actions/actions";
import {ScatterContractCaller} from "./contractCaller";
import {types} from "@sealsc/web-extension-protocol";
import scatterTypes from "./types";

class ScatterExtension extends types.ExtensionWrapper {
  constructor() {
    super()
    this.checker = new ScatterChecker(this)
    this.connector = new ScatterConnector(this)
    this.actions = new ScatterActions(this)
    this.contractCaller = new ScatterContractCaller(this)
  }

  load(network) {
    this.webjsInstance = ScatterJS.scatter
    this.network = network
    this.eos = ScatterJS.scatter.eos(network, Eos, {expireInSeconds: 60});

    window.scatter = undefined
  }

  setNetwork(network) {
    this.network = network
  }
}

let scatter = new ScatterExtension();

export {
  scatter,
  scatterTypes as types,
}