let hash = require('object-hash');

const TARGET_HASH = 1560;
let validator = require('./validator');
// let mongoose = require('mongoose');
let blockChainModel =  require('./model'); //  mongoose.model("BlockChain");
// let chalk = require('chalk')
class BlockChain{

    constructor(){
        this.chain = [];
        this.current_transaction = [];
    }

    getLastBlock(callback) {
       return blockChainModel.findOne({}, null, {sort: { _id: -1 }, limit: 1 }, (err, block) => {
           if(err){
                return;
           }
           return callback(block);
       });
    }
    addNewBlock(prevHash) {
      let block = {
         index: this.chain.length + 1,
         timestamp: Date.now(),
         transactions: this.current_transaction,
         hash: null,
         prevHash:  prevHash
      };
     let count = validator.proofOfWork();
     console.log(count)
      if(count == TARGET_HASH){
          block.hash = hash(block);
          this.getLastBlock((lastBlock) => {
              if(lastBlock){
                block.prevHash = lastBlock.hash;
              }
            let newBlock = new blockChainModel(block);
          newBlock.save((err) => {
              console.log("savvvvvvvvvvvvvvveeeeeeeeeeeeee")
               if(err){
                  console.log("errrrr");
              }else{
                  console.log("success");
              }
          });
        this.chain.push(block);
        this.current_transaction = [];
       return block;
          })

      }
    };

    addNewTransaction(sender, recipient, amount) {
        console.log("here")
       this.current_transaction.push({sender, recipient, amount});
    };

    lastBlock() {
        return this.chain.slice(-1)[0];
    };
    isEmpty() {
       return this.chain.length == 0;
    };

}

module.exports = BlockChain;
