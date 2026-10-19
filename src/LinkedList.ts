import { IComparable } from "./IComparable.js";
export class No<T extends IComparable> {
    public element: T;
    public next: No<T> | null;
    constructor(element: T, next: No<T>|null = null) {
        this.element = element;
        this.next = next;
    }

    toString(): string {
        return `Elemento => ${this.element}\nNext => ${this.next}`;
    }
}

export class LinkedList<T extends IComparable> {
    private _length: number;
    private _head: No<T> | null;
    private _tail: No<T> | null;

    constructor(element?: T) {
        if (element == undefined) {
            this._length = 0;
            this._head = null;
            this._tail = null;
        } else {
            this._length = 1;
            this._head = new No(element);
            this._tail = this._head;
        }
    }

    public get length(): number {
        return this._length;
    }
    
    public push(element: T) {
        const noAux: No<T> = new No(element);

        if (this._head == null) {
            this._head = noAux;
            this._tail = this._head;
        } else {
            this._tail!.next = noAux;
            this._tail = noAux;
        }
        this._length++;
    }

    public unshift(element: T) {
        const noAux: No<T> = new No(element, this._head);
        if (this._head == null) {
            this._tail = noAux;
        }
        this._head = noAux;
        this._length++;
    }

    private getNodeAt(index: number): No<T> | null {
        let noAux: No<T>|null = null;
        if (index >= 0 && index < this._length) {
            noAux = this._head;
            for (let i = 0; i < index; i++) {
                noAux = noAux!.next;
            }
        }
        return noAux;
    }

    public getElementAt(index: number): T | undefined {
        let noAux = this.getNodeAt(index);
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
                const previous = this.getNodeAt(index - 1);
                const newNode = new No(element, previous!.next);
                previous!.next = newNode;
                this._length++;
            }
            return true;
        }
        return false;
    }

    public removeAt(index: number): T | undefined {
        if (index >= 0 && index < this._length) {
            let current: No<T> | null = this._head;

            if (index === 0) {
                this._head = current!.next;
                if (this._length === 1) {
                    this._tail = null;
                }
            } else {
                const previous: No<T> | null = this.getNodeAt(index - 1);
                current = previous!.next;
                previous!.next = current!.next;
                if (index === this._length - 1) {
                    this._tail = previous;
                }
            }
            this._length--;
            return current!.element;
        }
        return undefined;
    }

    public remove(element: T): T | undefined {
        const index = this.findIndex(element);
        return (index != -1) ? this.removeAt(index) : undefined;
    }

    public findIndex(searchedElement: T): number {
        let current: No<T> | null = this._head;

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

    public clear() {
        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    toString(): string {
        if (this._head == null) {
            return "";
        }
        
        let objString = `${this._head.element}`;
        let auxNode: No<T> | null = this._head.next;
        while(auxNode != null) {
            objString += `\n${auxNode.element}`;
            auxNode = auxNode.next;
        }
        return objString;
    }

    public pop(): T | undefined {
        if (this._length == 0) {
            return undefined;
        } else {
            let elementAux: T = this._tail!.element;

            if (this._length == 1) {
                this._head = null;
                this._tail = null;
            } else {
                let noAux: No<T> | null = this.getNodeAt(this._length - 2);
                noAux!.next = null;
                this._tail = noAux;
            }
            this._length--;
            return elementAux;
        }
    }

    public shift(): T | undefined {
        if (this._length == 0) {
            return undefined;
        } else {
            let elementAux: T = this._head!.element;
            this._head = this._head!.next;
            if (this._length == 1) {
                this._tail = null;
            }
            this._length--;
            return elementAux;
        }
    }

    public reverse() {
        if (this._length > 1) {
            let previousNode: No<T> | null = null;
            let currentNode: No<T> | null = this._head;
            let nextNode: No<T> | null = null;
            this._tail = this._head;
            while (currentNode != null) {
                nextNode = currentNode.next;
                currentNode.next = previousNode;
                previousNode = currentNode;
                currentNode = nextNode;
            }
            this._head = previousNode;
        }
    }

    public sort() {
        if (this._length > 1) {
            let sorted = false;
            while (!sorted) {
                sorted = true;
                let currentNode = this._head;
                while (currentNode!.next != null) {
                    if (currentNode!.element.compareTo(currentNode!.next.element) > 0) {
                        let elementAux: T = currentNode!.element;
                        currentNode!.element = currentNode!.next.element;
                        currentNode!.next.element = elementAux;
                        sorted = false;
                    }
                    currentNode = currentNode!.next;
                }
            }
        }
    }
}