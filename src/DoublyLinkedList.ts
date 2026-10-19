import { IComparable } from "./IComparable.js";
import { No } from "./LinkedList.js";

class DoublyNode<T extends IComparable> extends No<T> {
    declare public next: DoublyNode<T> | null;
    public prev: DoublyNode<T> | null;

    constructor(element: T,
                next: DoublyNode<T> | null = null,
                prev: DoublyNode<T> | null = null) {
        super(element, next);
        this.prev = prev;
    }
}

export class DoublyLinkedList<T extends IComparable> {
    private _length: number;
    private _head: DoublyNode<T> | null;
    private _tail: DoublyNode<T> | null;

    constructor(element?: T) {
        if (element == undefined) {
            this._length = 0;
            this._head = null;
            this._tail = null;
        } else {
            this._length = 1;
            this._head = new DoublyNode(element);
            this._tail = this._head;
        }
    }

    public get length(): number {
        return this._length;
    }

    public push(element: T): void {
        const noAux: DoublyNode<T> = new DoublyNode(element, null, this._tail);

        if (this._tail == null) {
            this._head = noAux;
        } else {
            this._tail.next = noAux;
        }
        this._tail = noAux;
        this._length++;
    }

    public unshift(element: T): void {
        const noAux: DoublyNode<T> = new DoublyNode(element, this._head);

        if (this._head == null) {
            this._tail = noAux;
        } else {
            this._head.prev = noAux;
        }
        this._head = noAux;
        this._length++;
    }

    public pop(): T | undefined {
        if (this._tail == null) {
            return undefined;
        }
        return this.removeNode(this._tail);
    }

    public shift(): T | undefined {
        if (this._head == null) {
            return undefined;
        }
        return this.removeNode(this._head);
    }

    private getNoAt(index: number): DoublyNode<T> | null {
        if (index < 0 || index >= this._length) {
            return null;
        }

        let noAux: DoublyNode<T>;
        if (index < this._length / 2) {
            noAux = this._head!;
            for (let i = 0; i < index; i++) {
                noAux = noAux.next!;
            }
        } else {
            noAux = this._tail!;
            for (let i = this._length - 1; i > index; i--) {
                noAux = noAux.prev!;
            }
        }
        return noAux;
    }

    public getElementAt(index: number): T | undefined {
        const noAux = this.getNoAt(index);
        if (noAux != null) {
            return noAux.element;
        }
        return undefined;
    }

    public insert(element: T, index: number): boolean {
        if (index >= 0 && index <= this._length) {
            if (index == 0) {
                this.unshift(element);
            } else if (index == this._length) {
                this.push(element);
            } else {
                const current = this.getNoAt(index)!;
                const previous = current.prev!;
                const newNode = new DoublyNode(element, current, previous);
                previous.next = newNode;
                current.prev = newNode;
                this._length++;
            }
            return true;
        }
        return false;
    }

    public removeAt(index: number): T | undefined {
        const noAux = this.getNoAt(index);
        if (noAux != null) {
            return this.removeNode(noAux);
        }
        return undefined;
    }

    public remove(element: T): T | undefined {
        let current: DoublyNode<T> | null = this._head;
        while (current != null) {
            if (element.equals(current.element)) {
                return this.removeNode(current);
            }
            current = current.next;
        }
        return undefined;
    }

    public findIndex(searchedElement: T): number {
        let current: DoublyNode<T> | null = this._head;

        for (let i = 0; i < this._length; i++) {
            if (searchedElement.equals(current!.element)) {
                return i;
            }
            current = current!.next;
        }
        return -1;
    }

    public isEmpty(): boolean {
        return this._length === 0;
    }

    public clear(): void {
        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    toString(): string {
        if (this._head == null) {
            return "";
        }

        let objString = `${this._head.element}`;
        let auxNode: DoublyNode<T> | null = this._head.next;
        while (auxNode != null) {
            objString += `\n${auxNode.element}`;
            auxNode = auxNode.next;
        }
        return objString;
    }

    public reverse(): void {
        let current: DoublyNode<T> | null = this._head;
        while (current != null) {
            const nextNode: DoublyNode<T> | null = current.next;
            current.next = current.prev;
            current.prev = nextNode;
            current = nextNode;
        }
        [this._head, this._tail] = [this._tail, this._head];
    }

    public sort(): void {
        if (this._length > 1) {
            let current: DoublyNode<T> | null = this._head!.next;
            while (current != null) {
                const elementAux: T = current.element;
                let previous: DoublyNode<T> | null = current.prev;

                while (previous != null && previous.element.compareTo(elementAux) > 0) {
                    previous.next!.element = previous.element;
                    previous = previous.prev;
                }
                if (previous == null) {
                    this._head!.element = elementAux;
                } else {
                    previous.next!.element = elementAux;
                }
                current = current.next;
            }
        }
    }

    private removeNode(node: DoublyNode<T>): T {
        if (node.prev == null) {
            this._head = node.next;
        } else {
            node.prev.next = node.next;
        }

        if (node.next == null) {
            this._tail = node.prev;
        } else {
            node.next.prev = node.prev;
        }

        node.next = null;
        node.prev = null;
        this._length--;
        return node.element;
    }
}
