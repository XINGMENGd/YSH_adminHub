// /mock/test.ts

export default [
  {
    url: "/mock/test",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "success",
        result: ["jiang", "junfeng"],
      };
    },
  }
]