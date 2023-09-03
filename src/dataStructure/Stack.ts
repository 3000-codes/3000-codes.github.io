class Stack<T> {
  private readonly stack: T[] = []
  push (item: T): void {
    this.stack.push(item)
  }

  pop (): T | undefined {
    return this.stack.pop()
  }

  peek (): T | undefined {
    return this.stack[this.stack.length - 1]
  }

  isEmpty (): boolean {
    return this.stack.length === 0
  }

  size (): number {
    return this.stack.length
  }
}

export default Stack
