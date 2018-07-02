# dumlru

A dumb implementation of an LRU

## What's an LRU?

It's an acronym that stands for Least Recently Used. When people say LRU they're usually talking about a Least Recently Used cache, although the concept of frequency is used in other places, like Firefox's [frecency algorithm](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Places/Frecency_algorithm)

An LRU is a data structure made by combining a linked list and a hash. It's a data structure made out of data structures! "Yo dawg, we heard you like data structures, so we put data structures in your data structures so you can structure your data in data structures while you structure your data in a data structure"

It uses a linked list sorted such that the most recently used item is at the head of the list, while the least recently used item is at the tail of the list. Whenever an item is accessed, its node in the linked list is placed in the front of the list.

Simultaneouslty there is a map whose values contain pointers to the nodes in the linked list. There's one node per pointer and vice versa, and they point to eachother.

The hash is used to access items with O(n) time; upon access, the LRU moves the associated node in the linked list to the head of the linked list.

When inserting a new item into the hash, the item is also inserted into the linked list. If the linked list grows beyond its length constraint, the tail of the list, along with its associated entry in the hash, is deleted. In this manner we can set a max length for the LRU - whenever the LRU would exceed this length, the oldest item in the LRU is deleted.

## The Linked List

I've chosen to use a doubly-linked linked list implementation using a sentinel node. Why? Because it's what seemed easiest on this fine Sunday afternoon. Here's some pictures of it!

### Upon instantiation:

![A Fresh Linked List](assets/ll_sent.png)

The new linked list instance only has a sentinel node. Its length is 0 even though it has a node. That's because the sentinel node is special; it's not an element of this container, rather it's there to make other operations easier.

### Upon adding an item:

![A Freshly Mutated Linked List](assets/ll_sent_ins.png)

When adding an item, simply update the sentinel node's previous and next pointers. Update the inserted item's previous and next pointers to point to the right things too. Here's the code for that:

![Insert - Wrapper for Push](assets/linkedlistinsert.png)

Insert wraps around _push, ensuring only Nodes get inserted.

![_Push code](assets/linkedlist_push.png)

## A note on Inconsistent Naming

I didn't put much work into naming; when making linked lists, I generally just think of queues and stacks, plus all the pointer logic from lists and trees. The result is a jumble. Sometime's it's easier for me to think about these things with "next" and "prev", other times it's easier to reason with "left" and "right". Luckily, Ecmascript's getter/setter notation lets me be inconsistent with my naming!

![Linked List's Node](assets/ll_node.png)

Obviously this would never fly in the workplace
