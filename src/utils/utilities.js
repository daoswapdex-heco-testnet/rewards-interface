import supportedChains from "./chain";
import i18n from "@/plugins/i18n";

export function getChainData(chainId) {
  const chainData = supportedChains.filter(
    chain => chain.chain_id === parseInt(chainId)
  )[0];

  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  const API_KEY = process.env.VUE_APP_INFURA_ID;

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl
    };
  }

  return chainData;
}

export function ellipseAddress(address, width = 10) {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (time === "") {
    return "";
  }
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return i18n.t("Just"); // "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + i18n.t("minute ago"); // "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + i18n.t("hour ago"); // "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return i18n.t("1 day ago"); // "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      i18n.t("months") + // "月" +
      d.getDate() +
      i18n.t("days") + // "日" +
      d.getHours() +
      i18n.t("hours") + // "时" +
      d.getMinutes() +
      i18n.t("minutes") // "分"
    );
  }
}

// 格式化秒数
export function formatSeconds(value) {
  if (value === "") {
    return "";
  }
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  var dayTime = 0; // 天
  var result = "";
  if (value < 60) {
    result = secondTime + i18n.t("seconds"); // "秒";
  } else {
    if (secondTime >= 60) {
      // 如果秒数大于60，将秒数转换成整数
      // 获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      // 获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      // 如果分钟大于60，将分钟转换成小时
      if (minuteTime >= 60) {
        // 获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        // 获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
        if (hourTime >= 24) {
          // 获取天数， 获取小时除以24，得到整数天
          dayTime = parseInt(hourTime / 24);
          // 获取小时后取余小时，获取分钟除以24取余的分；
          hourTime = parseInt(hourTime % 24);
        }
      }
    }
    if (secondTime > 0) {
      secondTime = parseInt(secondTime) >= 10 ? secondTime : "0" + secondTime;
      result = " " + secondTime + i18n.t("seconds"); // "秒";
    }
    if (minuteTime > 0) {
      minuteTime = parseInt(minuteTime) >= 10 ? minuteTime : "0" + minuteTime;
      result = " " + minuteTime + i18n.t("minutes") + result;
    }
    if (hourTime > 0) {
      result = " " + parseInt(hourTime) + i18n.t("hours") + result;
    }
    if (dayTime > 0) {
      result = " " + parseInt(dayTime) + i18n.t("days") + result;
    }
  }
  return result;
}

// 格式化倒计时
export function formatCountdown(value) {
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  var dayTime = 0; // 天
  var result = "";
  if (value < 60) {
    result = "0 : 0 : " + secondTime + i18n.t("seconds"); // "秒";
  } else {
    if (secondTime >= 60) {
      // 如果秒数大于60，将秒数转换成整数
      // 获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      // 获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      // 如果分钟大于60，将分钟转换成小时
      if (minuteTime >= 60) {
        // 获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        // 获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
        if (hourTime >= 24) {
          // 获取天数， 获取小时除以24，得到整数天
          dayTime = parseInt(hourTime / 24);
          // 获取小时后取余小时，获取分钟除以24取余的分；
          hourTime = parseInt(hourTime % 24);
        }
      }
    }
    if (secondTime > 0) {
      secondTime = parseInt(secondTime) >= 10 ? secondTime : "0" + secondTime;
      result = " " + secondTime + i18n.t("seconds"); // "秒";
    }
    if (minuteTime > 0) {
      minuteTime = parseInt(minuteTime) >= 10 ? minuteTime : "0" + minuteTime;
      result = " " + minuteTime + i18n.t("minutes") + result;
    }
    if (hourTime > 0) {
      result = " " + parseInt(hourTime) + i18n.t("hours") + result;
    }
    if (dayTime > 0) {
      result = "" + parseInt(dayTime) + i18n.t("days") + result;
    }
  }
  return result;
}
