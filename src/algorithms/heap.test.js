//import {  } from "@testing-library/react";
import Heap from "./heap";

test("heap add", () => {
  let heap = Heap();
  heap.add({ id: 1, priority: 1, content: 100 });
});

test("heap get", () => {
  let heap = Heap();
  heap.add({ id: 1, priority: 1, content: 100 });
  heap.add({ id: 3, priority: 3, content: 300 });
  heap.add({ id: 2, priority: 2, content: 200 });
  heap.add({ id: 4, priority: 4, content: 400 });

  const res = [heap.get(), heap.get(), heap.get(), heap.get()];
  assert(res == [100, 200, 300, 400]);
});

test("heap update", () => {
  let heap = Heap();
  heap.add({ id: 1, priority: 1, content: 100 });
  heap.add({ id: 3, priority: 3, content: 300 });
  heap.add({ id: 2, priority: 2, content: 200 });
  heap.add({ id: 4, priority: 4, content: 400 });

  heap.add({ id: 3, priority: 3, content: 300 });
  heap.add({ id: 1, priority: 1, content: 100 });
  heap.add({ id: 4, priority: 0, content: 400 });
  heap.add({ id: 2, priority: 10, content: 200 });

  const res = [heap.get(), heap.get(), heap.get(), heap.get()];
  assert(res == [400, 100, 300, 200]);
});
