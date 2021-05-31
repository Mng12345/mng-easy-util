import {Interface} from "readline";
import readline from "readline";
import fs from "fs";

export class LineReader {
  private readonly readInterface: Interface
  private iter: AsyncIterator<string>
  constructor(public path: string) {
    this.readInterface = readline.createInterface(fs.createReadStream(path))
    this.iter = this.readInterface[Symbol.asyncIterator]()
  }
  async read() {
    const value = await this.iter.next()
    if (value.done) {
      return null
    } else {
      return value.value
    }
  }
}
