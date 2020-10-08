import Vector from "../algorithms/vector";

test("vec push", () => {
  let vec = new Vector();
  vec.push({ id: 1, priority: 1, content: 100 });
  expect(vec.getLen()).toStrictEqual(1);
});

test("vec get", () => {
  let vec = new Vector();
  vec.push({ id: 1, priority: 1, content: 100 });
  vec.push({ id: 3, priority: 3, content: 300 });
  vec.push({ id: 2, priority: 2, content: 200 });
  vec.push({ id: 4, priority: 4, content: 400 });

  const res = [vec.get(2), vec.get(0)];
  const gTruth = [
    { id: 2, priority: 2, content: 200 },
    { id: 1, priority: 1, content: 100 },
  ];
  expect(res).toStrictEqual(gTruth);
});

test("vec update", () => {
  let vec = new Vector();
  vec.push({ id: 1, priority: 1, content: 100 });
  vec.push({ id: 3, priority: 3, content: 300 });
  vec.push({ id: 2, priority: 2, content: 200 });
  vec.set(1, { id: 4, priority: 4, content: 400 });

  const res = [vec.get(1)];
  const gTruth = [{ id: 4, priority: 4, content: 400 }];
  expect(res).toStrictEqual(gTruth);
});

test("vec swap", () => {
  let vec = new Vector();
  vec.push({ id: 1, priority: 1, content: 100 });
  vec.push({ id: 3, priority: 3, content: 300 });
  vec.swap(0, 1);

  const res = [vec.get(1)];
  const gTruth = [{ id: 1, priority: 1, content: 100 }];
  expect(res).toStrictEqual(gTruth);
});

test("vec del", () => {
  let vec = new Vector();
  vec.push({ id: 1, priority: 1, content: 100 });
  vec.push({ id: 3, priority: 3, content: 300 });
  vec.push({ id: 2, priority: 2, content: 200 });
  vec.del(1);

  const res = [vec.get(1)];
  const gTruth = [{ id: 2, priority: 2, content: 200 }];
  expect(res).toStrictEqual(gTruth);
});
