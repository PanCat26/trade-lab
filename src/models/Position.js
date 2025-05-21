class Position {
    constructor({id = null, ticker, type, size, weight, entryPrice, exitPrice, stopLoss}){
        this.id = id;
        this.ticker = ticker;
        this.type = type;
        this.size = size;
        this.weight = weight;
        this.entryPrice = entryPrice;
        this.exitPrice = exitPrice;
        this.stopLoss = stopLoss;
    }
}