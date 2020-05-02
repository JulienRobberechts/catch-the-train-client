export function loadDataFromLocalStorage(key: string) {
  try {
    const serializedItem = localStorage.getItem(key);
    if (serializedItem === null) {
      return undefined;
    }
    return JSON.parse(serializedItem);
  } catch (error) {
    return undefined;
  }
}

export function saveDataIntoLocalStorage(key: string, value: unknown) {
  try {
    const serializedItem = JSON.stringify(value);
    localStorage.setItem(key, serializedItem);
  } catch (error) {
    // Ignore
  }
}
