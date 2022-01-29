const SHA256 = require("crypto-js/sha256");

export default class Block{
    constructor(timestamp,data,previousHash=null){
        this.timestamp = timestamp;
        if(typeof(data)==='object'){
            this.data = JSON.stringify(data);
        }else if(typeof data === 'string'){
            this.data = data;
        }
        this.previousHash = previousHash;
        this.hash = this.getHash(this.timestamp+this.data+this.previousHash);
    }

    getHash(data){
        return SHA256(data).toString();
    }


}
