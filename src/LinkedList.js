
class LinkedList {
    constructor(){
        this.sentinel = this._createSentinel();
        this.length = 0;
    }

    _createSentinel(){
        const sent = new Node(null);
        sent.left = sent.right = sent;
        return sent;
    }

    insert(value){
        if(!(value instanceof Node)){
            value = new Node(value);
        }

        this._push(value);
    }

    pop(){
        const popped = this._pop();

        if (popped === null) {
            return null;
        }

        return popped.value;
    }

    _pop(){
        if (this.head === this.tail && this.head === this.sentinel) {
            return null;
        }

        this.length--;

        const sent = this.sentinel;
        const prev = this.sentinel.prev;

        const popped = prev;

        sent.prev = popped.prev;
        popped.prev.next = sent;

        return popped
    }

    get head(){return this.sentinel.next;}
    set head(v){return this.unshift(v);}

    get tail(){return this.sentinel.prev;}
    set tail(v){ return this.insert(v) }

    _push(value){
        const sent = this.sentinel;
        const prev = this.sentinel.prev;

        sent.prev = value
        prev.next = value

        value.next = sent
        value.prev = prev

        return ++this.length
    }

    unshift(value){
        if(!(value instanceof Node)){
            value = new Node(value)
        }
        return this._unshift(value);
    }

    _unshift(value){
        this.length++;
        const sent = this.sentinel;
        const next = sent.next;

        sent.next = value
        next.prev = value

        value.prev = sent
        value.next = next

        return ++this.length
    }

    * walk(){
        let walk = this.head;

        do {
            yield walk;
            walk = walk.next
        } while (walk != this.sentinel)

        return null;
    }

    toArray(){
        const items = [];

        for (let item of this){
            items.push(item)
        }

        return items;
    }

    toString(){
        return String(this.toArray().map(n => n.value))
    }

    forEach(cb){
        let counter = 0;
        let arr = this.toArray();

        for (let item of this){
            cb(item, counter++, arr)
        }
    }

    map(cb){
        const result = [];

        this.forEach((e, i, a) => {
            result.push(
                cb(e, i, a)
            )
        });

        return result;
    }
}

LinkedList.prototype[Symbol.iterator] = function(){
    return this.walk();
};

class Node {
    constructor(value){
        this.value = value;
        this._left = this._right = this.prev = this.next = this.forward = this.back = null;
    }

    get left(){return this._left; }
    get prev(){return this._right;}
    get back(){return this._right;}

    set left(v){return this._left = v; }
    set prev(v){return this._right = v;}
    set back(v){return this._right = v;}

    get right(){return this._right; }
    get next(){return this._left;}
    get forward(){return this._left;}

    set right(v){return this._right = v; }
    set next(v){return this._left = v;}
    set forward(v){return this._left = v;}
}

export default LinkedList;
module.exports = {
    Node,
    LinkedList
}
