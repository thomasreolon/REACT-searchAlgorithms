interface Content<T> {
  id: number;
  priority: number;
  content: T;
}

class Tree<T> {
  value: Content<T>;
  left: Tree<T> | undefined;
  right: Tree<T> | undefined;
  parent: Tree<T> | undefined;

  constructor(value: Content<T>) {
    this.value = value; // contains (priority, unique id, content)
    this.left = undefined; // pointer to the left child
    this.right = undefined; // pointer to the right child
    this.parent = undefined; // pointer to the ancestor
  }
}

class MinHeap<T> {
  tree: Tree<T> | undefined;
  old: Map<number, Tree<T>>;

  constructor() {
    this.tree = undefined;
    this.old = new Map();
  }

  /*  takes an object containing:
   * {
   *    id: unique_identifier,
   *    priority: used to sort the heap (minimum first),
   *    content: what to store
   * }
   */
  add(value: Content<T>) {
    if (this.old.has(value.id)) {
      // update old value if smaller
      const tr = this.old.get(value.id);
      if (value.priority < tr.value.priority)
        tr.value.priority = value.priority;
    } else {
      // add new value
      const tmp = new Tree(value);
      /* ADD NODE TO TREE */
      /* INIT SWAPPER */
    }
  }

  get(): T {
    // raise error if heap is empty
    if (!this.tree) throw new Error("can't read from an empty heap");

    const val = this.tree.value; // get the minimum value

    /* INIT SWAPPER 2 */

    return val.content;
  }
}
