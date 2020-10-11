import Vector from "./vector";

interface Content<T> {
  id: number;
  priority: number;
  content: T;
}

class MinHeap<T> {
  v: Vector<Content<T>>;
  old: Map<number, Content<T>>;

  constructor(block_size: number | undefined) {
    this.v = new Vector(block_size || 100);
    this.old = new Map();
  }

  /*  takes an object containing:
   * {
   *    id: unique_identifier,
   *    priority: used to sort the heap (minimum first),
   *    content: what to store
   * }
   */
  add(value: Content<T>):boolean {
    const cc = this.old.get(value.id);
    if (cc) {
      // update old value if smaller
      if (value.priority < cc.priority) {
        cc.priority = value.priority;
        for (let i = 0; i < this.v.getLen(); i++) {
          const val = this.v.get(i);
          if (val.id === value.id) {
            this._fromBottomOrder(i);
            break;
          }
        }
        return true;
      }
    } else {
      // add new value
      this.v.push(value);
      this.old.set(value.id, value);
      this._fromBottomOrder(this.v.getLen() - 1);
      return true;
    }
    return false;
  }

  /**
   * get the Centent<T> with the lowest priority
   */
  get(): T {
    // raise error if heap is empty
    if (this.v.getLen() === 0) throw new Error("can't read from an empty heap");

    const val = this.v.get(0); // get the minimum value
    this.v.swap(0, this.v.getLen() - 1);
    this.v.del(this.v.getLen() - 1);
    this._fromTopOrder(0); //restore heap

    return val.content;
  }

  // if child is smaller than parent swap and call again
  _fromBottomOrder(idx: number) {
    const child = this.v.get(idx);
    const pidx = Math.floor(idx / 2);
    const parent = this.v.get(pidx);

    if (child.priority < parent.priority) {
      this.v.swap(idx, pidx);
      this._fromBottomOrder(pidx);
    }
  }

  // check if parent is smaller than children, if not --> swap
  _fromTopOrder(idx: number) {
    const len = this.v.len;
    const ch1 = (idx + 1) * 2;
    const ch2 = ch1 - 1;

    if (ch1 < len) {
      // check both children
      var res = idx;
      const p = this.v.get(idx);
      const c1 = this.v.get(ch1);
      const c2 = this.v.get(ch2);

      // find minimum node
      if (c1.priority < p.priority) res = ch1;
      if (c2.priority < p.priority && c2.priority < c1.priority) res = ch2;

      // if children are smaller: swap new minimun & call again
      if (res !== idx) {
        this.v.swap(idx, res);
        this._fromTopOrder(res);
      }
    } else if (ch2 < len) {
      // check only ch2 (ch1 out of bound)
      const p = this.v.get(idx);
      const c2 = this.v.get(ch2);

      // if child is smaller: swap new minimun & call again
      if (c2.priority < p.priority) {
        this.v.swap(idx, ch2);
        this._fromTopOrder(ch2);
      }
    }
  }
}

export default MinHeap;
