import {types, consts} from "@sealsc/web-extension-protocol";

async function loadContract(address) {
  let abi = await this.extension.eos.getAbi(address)
    .catch(reason => {
      return consts.predefinedStatus.UNKNOWN(reason)
    })

  if(abi instanceof types.Status) {
    return new types.Result(null, abi)
  }

  let wrapper = new types.ContractWrapper(abi, address)
  return new types.Result(wrapper, consts.predefinedStatus.SUCCESS(null))
}

export {
  loadContract
}