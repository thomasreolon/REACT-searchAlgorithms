class Vector<T> {
  values: Array<T>[];
  size: number;
  len: number;

  constructor(size: number) {
    this.size = size;
    this.len = 0;
    this.values = [Array(size)];
    if (!this.values) throw Error("couldn't create the array");
  }

  // get the coords
  _coord(index: number) {
    const arrayN = Math.floor(index / this.size);
    const id = index % this.size;
    return [arrayN, id];
  }

  // add a value at the end of the vector (eventually expands)
  push(content: T) {
    const [arrayN, index] = this._coord(this.len);
    if (index == 0) this.values.concat(Array(this.size));

    this.values[arrayN][index] = content;
    this.len++;
  }

  // get the value of an existing cell from an inedx
  get(index: number): T {
    if (index >= this.len) throw Error("index out of bound");
    const [arrayN, id] = this._coord(index);

    return this.values[arrayN][id];
  }

  // update the value of an existing cell
  set(index: number, content: T) {
    if (index >= this.len) throw Error("index out of bound");
    const [arrayN, id] = this._coord(index);
    this.values[arrayN][id] = content;
  }

  // delete and shift from index specified
  del(index: number) {
    if (index >= this.len) throw Error("index out of bound");
    this.len--;

    for (let i = index; i < this.len; i++) {
      const [a1, b1] = this._coord(i);
      const [a2, b2] = this._coord(i + 1);
      this.values[a1][b1] = this.values[a2][b2];
    }
    const [a2, b2] = this._coord(this.len);
    this.values[a2][b2] = undefined;
  }

  swap(idx1: number, idx2: number) {
    if (idx1 >= this.len || idx1 >= this.len) throw Error("index out of bound");
    const [arrayN1, id1] = this._coord(idx1);
    const [arrayN2, id2] = this._coord(idx2);

    const tmp = this.values[arrayN1][id1];
    this.values[arrayN1][id1] = this.values[arrayN2][id2];
    this.values[arrayN2][id2] = tmp;
  }

  getLen(): number {
    return this.len;
  }
}

export default Vector;
