import Node from "./Node.js";

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(key, value) {
    const node = new Node(key, value);

    if (!this.head && !this.tail) {
      this.head = node;
      this.tail = node;
      return;
    }

    if (!this.head) {
      this.head = node;
      return;
    }

    if (this.head && !this.tail) {
      this.tail = node;
      this.head.next = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }
}