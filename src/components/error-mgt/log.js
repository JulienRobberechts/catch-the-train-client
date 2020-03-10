function log(message, object) {
  if (process.env.NODE_ENV !== "production") {
    console.log(message);
  }
}

export { log };
