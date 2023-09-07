// 获取 Canvas 元素
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')

interface Substance {
  x: number
  y: number
  width: number
  height: number
}

interface Fox extends Substance {
  speed: number
  isMovingUp: boolean
  isMovingDown: boolean
  isMovingLeft: boolean
  isMovingRight: boolean
  isSpeedingUp: boolean
}

interface Food extends Substance {
  isEaten: boolean
}

interface Dog extends Substance {
  speed: number
}

// 定义游戏对象
const fox: Fox = {
  x: 0,
  y: 0,
  speed: 5,
  width: 50,
  height: 50,
  isMovingUp: false,
  isMovingDown: false,
  isMovingLeft: false,
  isMovingRight: false,
  isSpeedingUp: false
}

const food: Food = {
  x: 200,
  y: 200,
  width: 20,
  height: 20,
  isEaten: false
}

const dog: Dog = {
  x: 400,
  y: 400,
  speed: 2,
  width: 50,
  height: 50
}

const obstacles: Substance[] = [
  { x: 100, y: 100, width: 50, height: 50 },
  { x: 200, y: 200, width: 50, height: 50 },
  { x: 300, y: 300, width: 50, height: 50 }
]

// 绘制游戏场景
function draw (): void {
  if (ctx === null) return
  // 绘制背景
  ctx.fillStyle = '#8BC34A'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'gray'
  for (const obstacle of obstacles) {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
  }

  // 绘制狐狸
  ctx.fillStyle = '#FF9800'
  ctx.fillRect(fox.x, fox.y, fox.width, fox.height)

  // 绘制食物
  if (!food.isEaten) {
    ctx.fillStyle = '#F44336'
    ctx.fillRect(food.x, food.y, food.width, food.height)
  }

  // 绘制猎狗
  ctx.fillStyle = '#795548'
  ctx.fillRect(dog.x, dog.y, dog.width, dog.height)
}

// 更新游戏状态
function update (): void {
  // 移动狐狸
  // TODO:增加障碍物的碰撞检测
  // FIXME:速度过快时会穿过障碍物
  if (fox.isMovingUp && fox.y > 0) {
    fox.y -= fox.speed
  }
  if (fox.isMovingDown && fox.y < canvas.height - fox.height) {
    fox.y += fox.speed
  }
  if (fox.isMovingLeft && fox.x > 0) {
    fox.x -= fox.speed
  }
  if (fox.isMovingRight && fox.x < canvas.width - fox.width) {
    fox.x += fox.speed
  }
  if (fox.isSpeedingUp) {
    fox.speed = 10
  } else {
    fox.speed = 5
  }

  // 判断狐狸是否获取了食物
  if (!food.isEaten && isColliding(fox, food)) {
    food.isEaten = true
  }

  // 移动猎狗
  if (isColliding(fox, dog)) {
    // 狐狸被猎狗追捕，游戏失败
    // alert("Game Over!");
    // location.reload();
  } else {
    // 狐狸和猎狗之间的距离越近，猎狗的速度就越快
    const distance = getDistance(fox, dog)
    dog.speed = Math.max(2, 10 - distance / 50)
    // TODO:增加障碍物的碰撞检测
    if (fox.x < dog.x) {
      dog.x -= dog.speed
    }
    if (fox.x > dog.x) {
      dog.x += dog.speed
    }
    if (fox.y < dog.y) {
      dog.y -= dog.speed
    }
    if (fox.y > dog.y) {
      dog.y += dog.speed
    }
  }

  // 判断狐狸是否回到巢穴
  if (food.isEaten && isColliding(fox, { x: 500, y: 500, width: 50, height: 50 } satisfies Substance)) {
    // 狐狸成功获取所有的食物并回到巢穴，游戏胜利
    // alert("You Win!");
    // location.reload();
  }
}

// 碰撞检测
function isColliding (obj1: Substance, obj2: Substance): boolean {
  return (
    obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
  )
}

// 计算两个对象之间的距离
function getDistance (obj1: Substance, obj2: Substance): number {
  const dx = obj1.x - obj2.x
  const dy = obj1.y - obj2.y
  return Math.sqrt(dx * dx + dy * dy)
}

// 处理键盘事件
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowUp':
      fox.isMovingUp = true
      break
    case 'ArrowDown':
      fox.isMovingDown = true
      break
    case 'ArrowLeft':
      fox.isMovingLeft = true
      break
    case 'ArrowRight':
      fox.isMovingRight = true
      break
    case 'Space':
      fox.isSpeedingUp = true
      break
    //   TODO:增加道具的使用
  }
})

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ArrowUp':
      fox.isMovingUp = false
      break
    case 'ArrowDown':
      fox.isMovingDown = false
      break
    case 'ArrowLeft':
      fox.isMovingLeft = false
      break
    case 'ArrowRight':
      fox.isMovingRight = false
      break
    case 'Space':
      fox.isSpeedingUp = false
      break
  }
})

// 游戏循环
function loop (): void {
  update()
  draw()
  requestAnimationFrame(loop)
}

// 启动游戏
loop()
