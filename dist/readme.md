mng-easy-util contains some useful utils for js and ts developers

#### HashMap
```typescript
type Key = {
    name: string,
    age: number
}
const map = new HashMap<Key, number>();
map.set({name: 'zm', age: 13}, 1);
const count = map.get({name: 'zm', age: 13})
console.log(`count: ${count}`);
>> count: 1
```
