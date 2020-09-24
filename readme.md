mng-easy-util contains some useful utils for js and ts developers

#### github
https://github.com/Mng12345/mng-easy-util 

#### HashMap
```typescript
type Key = {
    name: string,
    age: number
}
const hashCode = (this: Key): string => {
    return `{a: ${this.name}, b: ${this.age}}`
}
const map = new HashMap<Key, number>();
map.set({name: 'zm', age: 13, hashCode}, 1);
const count = map.get({name: 'zm', age: 13, hashCode})
const anoCount = map.get({name: 'zm', age: 14, hashCode});
console.log(`count: ${count}\nanoCount: ${anoCount}`);
>> count: 1
>> anoCount: undefined
```
