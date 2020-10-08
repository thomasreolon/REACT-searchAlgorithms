//import {  } from "@testing-library/react";
import Vector from "./vector";

test("vec push", () => {
  let vec = Vector();
  vec.push({ id: 1, priority: 1, content: 100 });
});

test("vec get", () => {
  let vec = vec();
  vec.push({ id: 1, priority: 1, content: 100 });
  vec.push({ id: 3, priority: 3, content: 300 });
  vec.push({ id: 2, priority: 2, content: 200 });
  vec.push({ id: 4, priority: 4, content: 400 });

  const res = [vec.get(2), vec.get(0)];
  const gTruth = [
    { id: 2, priority: 2, content: 200 },
    { id: 1, priority: 1, content: 100 },
  ];
  assert(res == gTruth);
});

test("vec update", () => {
  let vec = vec();
  vec.push({ id: 1, priority: 1, content: 100 });
  vec.push({ id: 3, priority: 3, content: 300 });
  vec.push({ id: 2, priority: 2, content: 200 });
  vec.set(1, { id: 4, priority: 4, content: 400 });

  const res = [vec.get(1)];
  const gTruth = [{ id: 4, priority: 4, content: 400 }];
  assert(res == gTruth);
});

test("vec swap", () => {
  let vec = vec();
  vec.push({ id: 1, priority: 1, content: 100 });
  vec.push({ id: 3, priority: 3, content: 300 });
  vec.swap(0, 1);

  const res = [vec.get(1)];
  const gTruth = [{ id: 1, priority: 1, content: 100 }];
  assert(res == gTruth);
});

test("vec del", () => {
  let vec = vec();
  vec.push({ id: 1, priority: 1, content: 100 });
  vec.push({ id: 3, priority: 3, content: 300 });
  vec.push({ id: 2, priority: 2, content: 200 });
  vec.del(1);

  const res = [vec.get(1)];
  const gTruth = [{ id: 2, priority: 2, content: 200 }];
  assert(res == gTruth);
});
