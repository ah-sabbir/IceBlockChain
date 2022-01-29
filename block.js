const SHA256 = require("crypto-js/sha256");

const print = (content)=>{
    console.log(content);
}

class Block{
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

const block1 = new Block(
    new Date(),
    {
        "name":"sabbir ahmmed",
        "balance":12.00
    }
)

const block2 = new Block(
    new Date(),
    {
        "name":"rummon",
        "balance":13.56
    },
    block1.hash
)

print(block1)
print(block2)