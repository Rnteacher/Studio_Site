const fs = require("fs");

const isWindowsEisdirReadlink = (error) =>
  process.platform === "win32" &&
  error &&
  error.code === "EISDIR" &&
  error.syscall === "readlink";

const normalizeReadlinkError = (error) => {
  if (!isWindowsEisdirReadlink(error)) {
    return error;
  }

  error.code = "EINVAL";
  error.message = error.message.replace(/^EISDIR:/, "EINVAL:");
  return error;
};

const readlink = fs.readlink;
const readlinkSync = fs.readlinkSync;

fs.readlink = function patchedReadlink(path, options, callback) {
  if (typeof options === "function") {
    return readlink.call(this, path, (error, result) => {
      options(error ? normalizeReadlinkError(error) : null, result);
    });
  }

  return readlink.call(this, path, options, (error, result) => {
    callback(error ? normalizeReadlinkError(error) : null, result);
  });
};

fs.readlinkSync = function patchedReadlinkSync(path, options) {
  try {
    return readlinkSync.call(this, path, options);
  } catch (error) {
    throw normalizeReadlinkError(error);
  }
};

if (fs.promises?.readlink) {
  const promisesReadlink = fs.promises.readlink.bind(fs.promises);

  fs.promises.readlink = async function patchedPromisesReadlink(path, options) {
    try {
      return await promisesReadlink(path, options);
    } catch (error) {
      throw normalizeReadlinkError(error);
    }
  };
}

