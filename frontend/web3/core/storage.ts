import v8 from 'v8';
 
class Storage {
 storage:globalThis.Storage;
 prefix;
 constructor(storage:any){
   this.storage = storage;
   this.prefix = 'ink';
 }

   get(key:string) {
   const value = this.storage.getItem(`${this.prefix}.${key}`)
   try {
     return value ? v8.deserialize(JSON.parse(value)) : null;
   } catch (error) {
     console.warn(error);
     return null;
   }
 }

   set(key:string, value:any) {
   this.storage.setItem(`${this.prefix}.${key}`,JSON.stringify(v8.serialize(value)))
 }

   remove(key:string) {
     this.storage.removeItem(key);
 }
}


export default new Storage(localStorage);