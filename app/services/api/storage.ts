import AsyncStorage from "@react-native-async-storage/async-storage"


export class Storage {

  public async load(key: string): Promise<any | null> {
    try {
      const almostThere = await AsyncStorage.getItem(key)
      return JSON.parse(almostThere)
    } catch {
      return null
    }
  }

  /**
   * Saves an object to storage.
   *
   * @param key The key to fetch.
   * @param value The value to store.
   */
  public async save(key: string, value: any): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  }

  /**
   * Removes something from storage.
   *
   * @param key The key to kill.
   */
  public async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch {}
  }

  /**
   * Burn it all to the ground.
   */
  public async clear(): Promise<void> {
    try {
      await AsyncStorage.clear()
    } catch {}
  }
}
