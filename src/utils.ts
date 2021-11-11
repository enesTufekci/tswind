export function isNil(candidate: any) {
  return candidate === null || candidate === undefined || candidate === "";
}

export function omit<T extends Record<string, any>>(obj: T, keys: string[]) {
  let newRecord: Record<string, any> = {};
  for (let item of Object.keys(obj)) {
    if (!keys.includes(item as any)) {
      newRecord[item] = obj[item];
    }
  }
  return newRecord;
}

export function collect<T extends Record<string, any>>(obj: T, keys: string[]) {
  let absent: Record<string, any> = {};
  let present: Record<string, any> = {};

  for (let item of Object.keys(obj)) {
    if (!keys.includes(item as any)) {
      absent[item] = obj[item];
    } else {
      present[item] = obj[item];
    }
  }
  return [present, absent];
}
