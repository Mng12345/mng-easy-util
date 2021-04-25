import { throttle } from 'lodash'
import {sleep} from "./file";

export type MetaTask = {
  taskId: string
  status: 'running' | 'stopped'
}
export type VoidTask = () => Promise<void>
export type Task<R> = () => Promise<R>
export type WrappedTask<R> = {
  taskId: string
  task: Task<R>
}
export type TaskResult<R> = {
  taskId: string
  result?: R
  error?: any
}

const throttleLog = throttle((...data: any[]) => console.log(data), 2000)

export class AsyncPool<R> {
  taskCount: number = 0
  taskMap = new Map<string, MetaTask>()
  resultMap = new Map<string, TaskResult<R>>()
  buffer: WrappedTask<R>[] = []
  constructor(public size: number) {}
  private pushInner(task: Task<R>, taskId: string) {
    if (this.taskMap.has(taskId)) {
      console.log(`%c warning: task with taskId[${taskId}] already exists, please check your code!`, 'color: #faad14')
      return
    }
    const voidTask = async (): Promise<void> => {
      try {
        const result = await task()
        this.resultMap.set(taskId, {
          taskId,
          result,
          error: undefined
        })
      } catch (e) {
        this.resultMap.set(taskId, {
          taskId,
          result: undefined,
          error: e
        })
        console.log(`%c task[${taskId}] has failed with error:\n`, 'color: #f5222d')
        console.log(e)
      }
    }
    if (this.taskMap.size < this.size) {
      this.taskMap.set(taskId, {
        taskId,
        status: 'running'
      })
      voidTask().finally(() => {
        this.taskMap.delete(taskId);
      })
    } else {
      this.buffer.push({
        taskId,
        task
      })
    }
  }
  push(task: Task<R>, taskId: string) {
    this.pushInner(task, taskId)
    this.taskCount += 1
  }
  async wait() {
    for (;;) {
      if (this.taskMap.size < this.size && this.buffer.length > 0) {
        const wrappedTask = this.buffer.shift()!
        this.pushInner(wrappedTask.task, wrappedTask.taskId)
      } else if (this.taskMap.size === 0 && this.buffer.length === 0) { // all task done.
        console.log(`%c async pool status: ${this.taskMap.size} tasks running, ${this.buffer.length} tasks waiting, already processed ${this.resultMap.size}/${this.taskCount}.`
          , 'color: #52c41a')
        console.log(`%c all tasks done.`, 'color: #52c41a')
        break
      } else { // wait for all task done.
        throttleLog(`%c async pool status: ${this.taskMap.size} tasks running, ${this.buffer.length} tasks waiting, already processed ${this.resultMap.size}/${this.taskCount}.`
          , 'color: #52c41a')
        await sleep(50)
      }
    }
  }
}
