class TransferTokenExtraInfo {
  constructor(memo, symbol = '') {
    this.memo = memo
    this.symbol = symbol
  }
}

class OffChainCallParam {
  constructor(scope = false, limit = 10) {
    this.scope = scope
    this.limit = limit
  }
}

export default {
  TransferTokenExtraInfo,
  OffChainCallParam,
}