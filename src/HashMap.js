import LinkedList from "./LinkedList.js";

export default class HashMap {

  #length;
  #capacity;
  #loadFactor;
  #buckets;

  constructor() {
    this.#length = 0;
    this.#capacity = 16;
    this.#loadFactor = 0.75;
    this.#buckets = new Array(this.#capacity).fill(null);
  }
  
  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.#capacity;
    }
    return hashCode;
  }

  #resize() {
    const oldBuckets = [ ... this.#buckets ];
    this.#capacity *= 2;
    this.#buckets = new Array(this.#capacity).fill(null);
    this.#length = 0;

    for (const bucket of oldBuckets) {
      let current = bucket?.head;

      while (current) {
        this.set(current.key, current.value);
        current = current.next;
      }
    }
  }

  length() {
    return this.#length;
  }

  has(key) {
    const index = this.#hash(key);
    let current = this.#buckets[index]?.head;

    while (current) {
      if (current.key === key) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  get(key) {
    const index = this.#hash(key);
    let current = this.#buckets[index]?.head;

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return null;
  }

  set(key, value) {
    const index = this.#hash(key);
    const bucket = this.#buckets[index];
    let current = this.#buckets[index]?.head;

    if (bucket === null) {
      this.#buckets[index] = new LinkedList();
    }

    // Replace value if key exists
    while (current) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      current = current.next;
    }

    this.#buckets[index].append(key, value);
    this.#length++;

    if (this.#length > (this.#capacity * this.#loadFactor)) {
      this.#resize();
    }
  }

  remove(key) {
    if (!key) throw new Error('key must be an string!');

    const index = this.#hash(key);
    const bucket = this.#buckets[index];
    let current = this.#buckets[index]?.head;

    while (current) {
      // remove the head node of the bucket
      if (current === bucket.head && current.key === key && current?.next) {
        bucket.head = current.next;
        this.#length--;
        return true;
      }

      // remove the tail node of the bucket
      if (current?.next?.key === key && !current?.next?.next) {
        current.next = null;
        bucket.tail = current;
        this.#length--;
        return true;
      }

      // remove the bucket if it has only one node
      if (bucket.head.key === key && bucket.tail.key === key) {
        this.#buckets[index] = null;
        this.#length--;
        return true;
      }

      // remove a node between two nodes
      if (current?.next?.key === key && current?.next?.next) {
        current.next = current.next.next;
        this.#length--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  clear() {
    this.#capacity = 16;
    this.#buckets = new Array(this.#capacity).fill(null);
    this.#length = 0;
  }

  keys() {
    const output = [];

    for (const bucket of this.#buckets) {
      let current = bucket?.head;

      while (current) {
        output.push(current.key);
        current = current.next;
      }
    }
    return output;
  }

  values() {
    const output = [];

    for (const bucket of this.#buckets) {
      let current = bucket?.head;

      while (current) {
        output.push(current.value);
        current = current.next;
      }
    }
    return output;
  }

  entries() {
    const output = [];

    for (const bucket of this.#buckets) {
      let current = bucket?.head;

      while (current) {
        output.push([ current.key, current.value ]);
        current = current.next;
      }
    }
    return output;
  }
}