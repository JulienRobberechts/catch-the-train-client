function log(message: string, object?: any) {
  if (process.env.NODE_ENV !== "production") {
    console.log(message, object);
  }
}

export { log };
