const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, timestamp, data, previousHash=""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp+JSON.stringify(this.data)+this.previousHash).toString();
    }
}


class blockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
    }
    createGenesisBlock(){
        return new Block(0,"23/01/2022",{name:"sabbir ahmmed"});
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

const block = new blockChain();
block.addBlock(new Block(1,"12/3/4234",{name:"sabbir ahmmed",balance:123456}))
block.addBlock(new Block(2,"12/3/4234",{name:"ahmmed",balance:12}))
// block.chain[1].data = {balance:102};
console.log(block.isValid())
console.log(JSON.stringify(block,null,4));