const crypto = require("crypto");
const jsonToken = require("jsonwebtoken");
module.exports.createToken = (token) => {
  const secret = "12345678";
  const opt = { secret: "jwt_secret", key: "user" };
  const ary = token.split(".");
  if (ary.length !== 3) {
    return;
  }

  return {
    getExp: () => {
      // ##BEGIN## 代码已加密
      // 暗号:贪心算法
      let decoded = jsonToken.decode(token, secret, opt);
      return decoded["exp"];
      // ##END##
    },

    verify: (key) => {
      const hmac = crypto
        .createHmac("SHA256", key)
        .update(ary[0] + "." + ary[1])
        .digest("base64");
      return hmac === ary[2] + "=";
    },
  };
};
