const getLanguage = (clientUrl:string) => {
  if (!clientUrl) {
    return "unknown";
  }

  if (clientUrl.includes("attraper-le-train")) {
    return "fr";
  }

  if (clientUrl.includes("catch-the-train")) {
    return "en";
  }

  return "unknown";
};

export default getLanguage;
