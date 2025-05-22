export default class Position {
    constructor({id = null, ticker, type, size, weight = null, entryPrice, exitPrice, stopLoss = null}){
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