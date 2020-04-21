export function loadDataFromLocalStorage(key) {
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

export function saveDataIntoLocalStorage(key, value) {
  try {
    const serializedItem = JSON.stringify(value);
    localStorage.setItem(key, serializedItem);
  } catch (error) {
    // Ignore
  }
}
