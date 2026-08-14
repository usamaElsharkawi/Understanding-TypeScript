"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
    value;
    next;
    constructor(value) {
        this.value = value;
    }
}
class LinkedList {
    root = undefined;
    tail = undefined;
    length = 0;
    add(value) {
        const node = new ListNode(value);
        if (!this.root || !this.tail) {
            this.root = node;
            this.tail = node;
        }
        else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }
    insertAt(value, pos) {
        if (pos > -1 && pos < this.length && this.root) {
            let current = this.root;
            let index = 0;
            let previous = current;
            let node = new ListNode(value);
            if (pos === 0) {
                node.next = this.root;
                this.root = node;
            }
            else {
                while (index++ < pos && current.next) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.length++;
            return true;
        }
        else {
            return false;
        }
    }
    removeAt(pos) {
        if (pos > -1 && pos < this.length && this.root) {
            let current = this.root;
            let previous = current;
            let index = 0;
            if (pos === 0) {
                this.root = current.next;
                // If list becomes empty, update tail
                if (this.length === 1) {
                    this.tail = undefined;
                }
            }
            else {
                while (index++ < pos && current.next) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
                // If removing last element, update tail
                if (pos === this.length - 1) {
                    this.tail = previous;
                }
            }
            this.length--;
            return current;
        }
        else {
            return null;
        }
    }
    getNumberOfElements() {
        return this.length;
    }
    print() {
        let current = this.root;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
}
const numberList = new LinkedList();
numberList.add(9);
numberList.add(33);
numberList.add(5);
console.log(numberList.getNumberOfElements());
numberList.print();
// Demo: Remove and re-add to verify tail pointer maintenance
console.log('\n--- Testing tail pointer maintenance ---');
numberList.removeAt(1); // Remove middle
numberList.removeAt(1); // Remove last (tests tail update)
numberList.add(100); // Add after removing last (tests tail)
console.log('After remove and add:');
numberList.print();
//# sourceMappingURL=linked-list.js.map