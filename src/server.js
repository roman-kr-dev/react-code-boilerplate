const DUMMY = [
  "111111",
  "111222",
  "222222",
  "abc32222",
  "333333",
  "ddd33333",
  "444444",
  "zzz44444"
];

async function getDataFromServer(str) {
  const rnd = 300 + Math.floor(Math.random() * 2000);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("response from server with str", str);
      resolve(DUMMY.filter((value) => value.indexOf(str) >= 0));
    }, rnd);
  });
}

export { getDataFromServer };
