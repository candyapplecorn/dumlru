import { LinkedList, Node } from './LinkedList';

Number.prototype.times = function(callback){
    for (let counter = 1; counter <= this; counter++){
        callback(counter);
    }
};

describe('LinkedList', () => {
    let ll;
    beforeEach(() => {
        ll = new LinkedList();
    });
    it('is a list', () => {
        expect(ll instanceof LinkedList).toBeTruthy();
    });
    describe('list operations', () => {
        beforeEach(() => {
            ll = new LinkedList();
        });
        it('can append elements', () => {
            const length = ll.length;
            const myNode = new Node(2)
            ll.insert(myNode);
            expect(length).toBeLessThan(ll.length);
        });
        it('has a tail', () => {
            ll.insert(2);
            expect(ll.tail.value).toEqual(2);
        });
        it('can insert multiple elements', () => {
            ([... new Array(4)].map((e, i) => i)).forEach((n, i) => {
                ll.insert(n);
                expect(ll.tail.value).toEqual(n);
                expect(ll.length).toEqual(i + 1);
            });
        });
        it('can remove the last element', () => {
            ll.insert(2);
            expect(ll.tail.value).toEqual(2);
            const removed = ll.pop();
            expect(removed).toEqual(2);
            expect(ll.length).toEqual(0)
        });
        it('removes items in order', () => {
            const oneThroughFour = ([... new Array(4)].map((e, i) => i));

            oneThroughFour.forEach((n, i) => {
                ll.insert(n);
                expect(ll.tail.value).toEqual(n);
                expect(ll.length).toEqual(i + 1);
            });

            oneThroughFour.reverse().forEach((n, i) => {
                const popped = ll.pop();
                expect(popped).toEqual(n);
                expect(ll.length).toEqual(oneThroughFour.length - i - 1);
            });
        });
        it('does not remove its sentinel node', () => {
            const ll = new LinkedList();

            const sent = ll.head;
            (3).times(ll.pop.bind(ll))
            expect(sent).toEqual(ll.head)
        });
    });
    describe('toString', () => {
        beforeEach(() => {
            ll = new LinkedList();
        });
        it('prints its items', () => {
            const aList = [1, 2, 3];
            (3).times(ll.insert.bind(ll))

            expect(ll.length).toEqual(3)
            expect(ll.toString()).toEqual(aList.toString());

        });
        it('does not crash for empty list toString', () => {
            (3).times(ll.pop.bind(ll))
            expect(ll.toString()).toEqual(String([]))
        });
    });
});
