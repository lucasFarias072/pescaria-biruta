

const values = {
  alertHookingColor: 'rgb(0, 222, 0)',
  alertNotHookingColor: 'rgb(10, 40, 20)',
  alertLostHookColor: 'rgb(128, 28, 0)',
  doubled: 2,
  creationTime: 250,
  clockIncreaser: 50,
  clockRebooter: 0,
  fullBucket: 18,
  fullLake: 36,
  fishIsHooked: 'peixe capturado',
  fishIsNotComing: 'nada fisgado',
  fishScaped: 'peixe escapou',
  fishVisibilityCap: 1.0,
  hookedPos: '3.3rem',
  invisibleFish: '0',
  properRowsAmount: 3,
  slotIsEmpty: 0,
  smallFishScaleReducer: '0.96',
  stdBackground: 'linear-gradient(15deg, rgb(0, 86, 159), rgb(29, 145, 197), rgb(129, 179, 202))',
  unlikelyChance: 0.9,
  unlikelyChanceGreater: 0.95,
  visibilityIncreaser: 0.1
}

localStorage.getItem('theme') === null ? localStorage.setItem('theme', values.stdBackground) : null

// Game elements
const alertBtn = document.getElementById("alert")
const boat = document.getElementById("boat")
const fishImg = document.getElementById("fish-img")
const hook = document.getElementById("hook")
const rod = document.getElementById("rod")
const thread = document.getElementById("thread")
const lake = document.getElementById('lake')
const bucket = document.getElementById('bucket')

// All templates
const windows = [...document.querySelectorAll('.win')]
windows.forEach(screen => screen.style.background = localStorage.getItem('theme'))

// Templates (separated)
const indexTemplate = document.getElementById('game-index-screen-template')
const gameTemplate = document.getElementById('game-template')
const gameResourcesTemplate = document.getElementById('game-resources-template')
const fishFromGameTemplate = document.getElementById('fish-from-game-template')
const instructionsTemplate = document.getElementById('instructions-template')

// Triggers
const launcher = document.getElementById('launcher')
const fishFromGameTrigger = document.getElementById('fish-from-game-trigger')
const instructionsTrigger = document.getElementById('instructions-trigger')

// Dynamic DOM content
const fishChart = document.getElementById('fish-chart')

let bucketPos = 0
let gameClock = 0

const fishPercentageChance = {
  "big-mouth-bassterd": 1,
  "candy-striper": 1,
  "mutha-guppa": 1,
  "orange-guppy": 95,
  "red-guppy": 95,
  "yellow-guppy": 95,
  "blue-bass": 90,
  "brown-bass": 90,
  "green-bass": 90,
  "blue-striper": 85,
  "gray-striper": 85,
  "green-striper": 85,
  
  "buckin-bino": 1,
  "chargin-chino": 1,
  "tootin-tino": 1,
  "blue-seedkin": 90,
  "green-seedkin": 90,
  "pink-seedkin": 90,
  "cool-rainbow-trout": 85,
  "frozen-rainbow-trout": 85,
  "warm-rainbow-trout": 85,
  "dicy-tuna": 80,
  "icy-tuna": 80,
  "spicy-tuna": 80,
  
  "diamondback-lion": 1,
  "emeraldback-lion": 1,
  "rubyback-lion": 1,
  "black-pebbo": 85,
  "brown-pebbo": 85,
  "white-pebbo": 85,
  "black-rocque-biter": 80,
  "bluestone-biter": 80,
  "pyrite-biter": 80,
  "sand-boldur": 75,
  "slate-boldur": 75,
  "stone-boldur": 75
}

// todo
const themes = [
  'linear-gradient(15deg, rgb(0, 86, 159), rgb(29, 145, 197), rgb(129, 179, 202))',
  'linear-gradient(15deg, rgb(2, 136, 209),rgb(79, 195, 247), rgb(179, 229, 252))',
  'linear-gradient(15deg, rgb(52, 176, 255), rgb(129, 245, 255), rgb(229, 255, 255))',
  'linear-gradient(15deg, rgb(52, 176, 255), rgb(129, 245, 255), rgb(255, 203, 97))',
  'linear-gradient(15deg, rgb(129, 245, 255), rgb(255, 203, 97), rgb(255, 166, 50))',
  'linear-gradient(15deg, rgb(25, 50, 77), rgb(30, 60, 107),rgb(0, 86, 159))',
  'linear-gradient(15deg, rgb(2, 11, 55), rgb(12, 22, 66), rgb(22, 33, 77))',
  'linear-gradient(15deg, rgb(0, 7, 44), rgb(7, 17, 55),rgb(12, 22, 66))',
  'linear-gradient(15deg, rgb(0, 33, 44),rgb(0, 46, 66),rgb(0, 86, 159))'
]

const hookRanges = [-3, -2, -1, 0, 1, 2, 3]

const eachFishName = Object.keys(fishPercentageChance)

const eachSmallFish = [
  'orange-guppy', 'red-guppy', 'yellow-guppy', 
  'blue-seedkin', 'green-seedkin', 'pink-seedkin',
  'black-pebbo', 'brown-pebbo', 'white-pebbo'
]

const eachAverageFish = [
  'blue-bass', 'brown-bass', 'green-bass',
  'cool-rainbow-trout', 'frozen-rainbow-trout', 'warm-rainbow-trout',
  'black-rocque-biter', 'bluestone-biter', 'pyrite-biter'
]

const eachLargeFish = [
  'blue-striper', 'gray-striper', 'green-striper',
  'dicy-tuna', 'icy-tuna', 'spicy-tuna',
  'sand-boldur', 'slate-boldur', 'stone-boldur'
]

const eachRareFish = [
  'big-mouth-bassterd', 'candy-striper', 'mutha-guppa',  
  'buckin-bino', 'chargin-chino', 'tootin-tino',  
  'diamondback-lion', 'emeraldback-lion', 'rubyback-lion',  
]

const easyFish = [
  "orange-guppy",
  "red-guppy",
  "yellow-guppy",
  "blue-seedkin",
  "green-seedkin",
  "pink-seedkin",
  "black-pebbo",
  "brown-pebbo",
  "white-pebbo",
]

const fishImagesCommon = [
  './assets/img/orange-guppy.gif',
  './assets/img/red-guppy.gif',
  './assets/img/yellow-guppy.gif',
  './assets/img/blue-seedkin.gif',
  './assets/img/green-seedkin.gif',
  './assets/img/pink-seedkin.gif',
  './assets/img/black-pebbo.gif',
  './assets/img/brown-pebbo.gif',
  './assets/img/white-pebbo.gif',
]

const adjustTime = (timeObject) => {
  return timeObject > 9 ? timeObject : `0${timeObject}`
}

// todo
const setupThreadStyle = (threadHtml, hookHtml, indicator) => {
  const morningThemes = [0, 1, 2] // #222
  const afternoonThemes = [3, 4]  // crimson
  const eveningThemes = [5, 6]    // orangered

  if (morningThemes.includes(indicator)) {
    threadHtml.style.background = '#222'
    hookHtml.style.background = '#222'
    threadHtml.style.boxShadow = '0 0 .5rem #222'
    hookHtml.style.boxShadow = '0 0 .5rem #222'
  } else if (afternoonThemes.includes(indicator)) {
    threadHtml.style.background = 'rgb(33, 66, 99)'
    hookHtml.style.background = 'rgb(33, 66, 99)'
    threadHtml.style.boxShadow = '0 0 .5rem rgb(33, 66, 99)'
    hookHtml.style.boxShadow = '0 0 .5rem rgb(33, 66, 99)'
  } else if (eveningThemes.includes(indicator)) {
    threadHtml.style.background = 'rgb(199, 244, 0)'
    hookHtml.style.background = 'rgb(199, 244, 0)'
    threadHtml.style.boxShadow = '0 0 .5rem rgb(199, 244, 0)'
    hookHtml.style.boxShadow = '0 0 .5rem rgb(199, 244, 0)'
  } else {
    threadHtml.style.background = 'aqua'
    hookHtml.style.background = 'aqua'
    threadHtml.style.boxShadow = '0 0 .5rem aqua'
    hookHtml.style.boxShadow = '0 0 .5rem aqua'
  }
}

const setupTime = (timeObject, themes) => {
  const b4Morning = [5, 6]
  const afterMorning = [7, 8, 9, 10]
  const afternoonStart = [11, 12, 13, 14, 15]
  const afternoonEnd = [16, 17]
  const eveningAdvance = [19, 20, 21, 22, 23]
  const eveningLate = [0, 1, 2, 3]
  let pos
  
  if (b4Morning.includes(timeObject.h)) {
    pos = 0
  } 
  else if (afterMorning.includes(timeObject.h)) {
      pos = 1
  } 
  else if (afternoonStart.includes(timeObject.h)) {
      pos = 2
  } 
  else if (afternoonEnd.includes(timeObject.h) && timeObject.m <= 39) {
      pos = 3
  } 
  else if (timeObject.h === 16 && timeObject.m > 39 || timeObject.h === 17 && timeObject.m > 39) {
      pos = 4
  } 
  else if (timeObject.h === 18) {
      pos = 5
  } 
  else if (eveningAdvance.includes(timeObject.h)) {
      pos = 6
  } 
  else if (eveningLate.includes(timeObject.h) || timeObject.h === 4 && timeObject.m < 49) {
      pos = 7
  } 
  else {
      pos = 8
  }
  
  return pos
}

const selectWindow = (windowsGroup, selected) => {
  for(let i = 0; i < windowsGroup.length; i++) {
    windowsGroup[i] != selected 
    ? windowsGroup[i].classList.add('cls-vanished')
    : windowsGroup[i].classList.remove('cls-vanished')
  }
}

const selectWindowMultiple = (windowsGroup, selected) => {
  for(let i = 0; i < windowsGroup.length; i++) {
    !selected.includes(windowsGroup[i]) 
    ? windowsGroup[i].classList.add('cls-vanished')
    : windowsGroup[i].classList.remove('cls-vanished')
  }
}

const returnIndex = () => {
  for(let tag of windows) {
    tag != indexTemplate ? tag.classList.add('cls-vanished') : tag.classList.remove('cls-vanished')
  }
}

const loadFish = (where, fishPathsArray, msg, isRare=false) => {
  const txt = document.createElement('h3')
  txt.textContent = msg
  where.appendChild(txt)
  
  for(let i = 0; i < fishPathsArray.length; i++) {
    const fishImg = document.createElement('img')
    isRare ? fishImg.classList.add('cls-rare-fish') : null
    fishImg.style.opacity = '1'
    fishImg.style.margin = '.3rem'
    fishImg.setAttribute('src', `../assets/img/${fishPathsArray[i]}.gif`)
    where.appendChild(fishImg)
  }
}

const createBucket = (where, amount) => {
  for(let i = 0; i < amount; i++) {
    const container = document.createElement("div")
    container.setAttribute("class", "flex row going-center")
    for(let i = 0; i < 6; i++) {
      const fishContainer = document.createElement('div')
      fishContainer.className = 'flex row going-center'
      fishContainer.classList.add("cls-slot")
      const slot = document.createElement("img")
      slot.style.opacity = "3"
      fishContainer.appendChild(slot)
      container.appendChild(fishContainer)
    }
    where.appendChild(container)
  }
}

const getIndice = (tail, head) => {
  return Math.floor(Math.random() * (head - tail) + tail)
}

const giveBirthFish = (where, amount, img) => {
  for (let i = 0; i < amount; i++) {
    const fishName = img.split("/")[2].split(".gif")[0]
    const fishChanceToCapture = fishPercentageChance[fishName]
    const fish = document.createElement('img')
    
    fish.setAttribute('src', img)
    fish.setAttribute('class', 'fish')
    fish.setAttribute('data-name', fishName)
    
    where.appendChild(fish)
  }
}

const applyOffset = (tail, head) => {
  return Math.floor(Math.random() * (head - tail) + tail)
}

const moveLake = (htmlLake) => {
  // const bg = []
  // const htmlBackground = localStorage.getItem('theme')
  
  let lakeOffsetMin = -4
  let lakeOffsetMax = 5
  let lakeRotationOffsetMin = -3
  let lakeRotationOffsetMax = 4
  let threeGradients = 10
  let fourGradients = 13
  let numbers = ''
  let newValue = ''
  
  // for(let i = 1; i < htmlBackground.length; i++) {
  //   if (!isNaN(htmlBackground[i])) {
  //     numbers += htmlBackground[i]
  //   }
  // }

  // numbers = numbers.split(' ')
  
  // for(let i = 0; i < numbers.length; i++) {
  //   if (numbers[i] != '') {
  //     bg.push(parseInt(numbers[i]))
  //   }
  // }

  // bg[0] += getIndice(lakeOffsetMin, lakeOffsetMax)

  // if (bg.length === threeGradients) {
  //   const inkA = `rgb(${bg[1]}, ${bg[2]}, ${bg[3]}),`
  //   const inkB = `rgb(${bg[4]}, ${bg[5]}, ${bg[6]}),`
  //   const inkC = `rgb(${bg[7]}, ${bg[8]}, ${bg[9]})`
  //   newValue += `linear-gradient(${bg[0]}deg, ${inkA} ${inkB} ${inkC})`
  // } else {
  //   const inkA = `rgb(${bg[1]}, ${bg[2]}, ${bg[3]}),`
  //   const inkB = `rgb(${bg[4]}, ${bg[5]}, ${bg[6]}),`
  //   const inkC = `rgb(${bg[7]}, ${bg[8]}, ${bg[9]}),`
  //   const inkD = `rgb(${bg[10]}, ${bg[11]}, ${bg[12]})`
  //   newValue += `linear-gradient(${bg[0]}deg, ${inkA} ${inkB} ${inkC} ${inkD})`
  // }

  // console.log(newValue)
  
  const loop = setInterval(() => {
    htmlLake.style.transform = `rotate(${getIndice(lakeRotationOffsetMin, lakeRotationOffsetMax)}deg)`
    // const chanceToMoveGradient = Math.random()
    // if (chanceToMoveGradient > 0.98) {
    //   htmlLake.style.background = newValue
    // }
  }, 1000)
}

const moveFish = (htmlFishRect, htmlLakeRect, fishTag) => {
  const offsetX = applyOffset(1, 34)
  const offsetY = applyOffset(15, 34)
  const orientation = applyOffset(1, 9)

  let fishX = parseInt(fishTag.style.top.split("px")[0])
  let fishY = parseInt(fishTag.style.left.split("px")[0])
  
  if (orientation === 1) {
    fishTag.style.top = `${fishY + offsetY}px`
  } else if (orientation === 2) {
    fishTag.style.top = `${fishY - offsetY}px`
  } else if (orientation === 3) {
    fishTag.style.left = `${fishX + offsetX}px`
  } else if (orientation === 4) {
    fishTag.style.left = `${fishX - offsetX}px`
  } 
  
  fishTag.style.transform = `rotate(${applyOffset(-90, 91)}deg)`

  const fishCurrentX = parseInt(fishTag.style.top.split("px")[0])
  const fishCurrentY = parseInt(fishTag.style.left.split("px")[0])
  // console.log([fishCurrentX, fishCurrentY])
  
  if (fishCurrentX < 0) {
    fishTag.style.left = '10px'
  } else if (fishCurrentX > 1300) {
    fishTag.style.left = '1200px'
  }

  if (fishCurrentY < 0) {
    fishTag.style.top = '10px'
  } else if (fishCurrentY > 450) {
    fishTag.style.top = '450px'
  }
  
}

const checkHookChance = (fishPercentage) => {
  const systemChance = applyOffset(0, 101)
  return fishPercentage >= systemChance ? true : false
}

const moveBoat = (boatTag) => {
  let bounce = 0
  const boatMovement = setInterval(() => {
    bounce > 2 ? bounce = 0 : bounce++
    bounce % 2 === 0 ? boatTag.style.transform = `rotate(${applyOffset(-7, 8)}deg)` : boatTag.style.transform = `rotate(-${applyOffset(-7, 8)}deg)`
  }, 1000)
}

const decideFishInclusion = (chanceToCome, chanceToComePersonal, chanceToAdd, chanceToAddPersonal, indicePicked, htmlLake, allFishArray, commonFishArray) => {
  if (chanceToCome === chanceToComePersonal) {
    if (chanceToAdd > chanceToAddPersonal) {
      giveBirthFish(htmlLake, 1, allFishArray[indicePicked])
    } else {
      giveBirthFish(htmlLake, 1, commonFishArray[getIndice(0, commonFishArray.length)])
    }
  }
}

const setupCapturedFish = (capturedFish, capturedFishImg) => {
  capturedFish.style.position = 'absolute'
  capturedFish.setAttribute("src", `./assets/img/${capturedFishImg}.gif`)
  capturedFish.style.transform = 'rotate(270deg)'
  capturedFish.style.zIndex = '5'
  capturedFish.style.opacity = '1'
}

const fishImages = []

for(let fish of eachFishName) {fishImages.push(`./assets/img/${fish}.gif`)}

loadFish(fishChart, eachSmallFish, 'Pequenos')
loadFish(fishChart, eachAverageFish, 'Médios')
loadFish(fishChart, eachLargeFish, 'Grandes')
loadFish(fishChart, eachRareFish, 'Raros', true)

createBucket(bucket, values.properRowsAmount)
const bucketSpace = [...document.querySelectorAll('.cls-slot')]

// Get tag element of each fish
let fish = [...document.querySelectorAll('.fish')]
const lakeStats = lake.getBoundingClientRect()

// Place all the fish in the middle of the lake
fish.forEach(fishInstance => {
  fishInstance.style.top = `${parseInt(lakeStats.height / 2)}px`
  fishInstance.style.left = `${parseInt(lakeStats.width / 2)}px`
})

const hookMovement = setInterval(() => {
  const threadStats = thread.getBoundingClientRect()
  const hookStats = hook.getBoundingClientRect()
  hook.style.top = `${threadStats.y - 60}px`
  hook.style.left = `${threadStats.x - 5}px`
}, 1)

const moveBoatLoop = moveBoat(boat)

const threadMovement = setInterval(() => {
  const rotation = applyOffset(1, 4)
  thread.style.transform = `rotate(${rotation}deg)`
}, 500)

// Check if game should start (stopped when true)
const gameMustRunLoop = setInterval(() => {
  const isGameSupposedToRun = launcher.getAttribute('class').split(' ').includes('enabled')
  
  if(isGameSupposedToRun) {
    clearInterval(gameMustRunLoop)
    selectWindowMultiple(windows, [gameTemplate, gameResourcesTemplate])
    
    const gameLoop = setInterval(() => {
      // console.log(`Peixes no lago: ${lake.childNodes.length}`)
      moveLake(lake)
      
      // todo
      const currentTime = new Date()
      const clock = {h: currentTime.getHours(), m: currentTime.getMinutes(), s: currentTime.getSeconds()}
      // const clock = {h: 18, m: 50, s: 0}
      const themeColor = setupTime(clock, themes)
      lake.style.background = themes[themeColor]
      localStorage.setItem('theme', themes[themeColor])
      setupThreadStyle(thread, hook, themeColor)
      
      document.getElementById('h').textContent = adjustTime(clock.h)
      document.getElementById('min').textContent = adjustTime(clock.m)
      document.getElementById('sec').textContent = adjustTime(clock.s)
      
      if (gameClock != values.creationTime) {
        gameClock += values.clockIncreaser
      } else {
        gameClock = values.clockRebooter
        
        // If lake is not full: take an indice and find the fish name to be 'possibly included'
        if (lake.childNodes.length < values.fullLake) {
          const fishIndice = getIndice(0, fishImages.length)
          const fishChanceToCome = fishPercentageChance[fishImages[fishIndice].split("/")[3].split(".gif")[0]]
          console.log(fishChanceToCome)
          
          const extraCondition = Math.random()

          decideFishInclusion(fishChanceToCome, 1, extraCondition, 0.9, fishIndice, lake, fishImages, fishImagesCommon)
          decideFishInclusion(fishChanceToCome, 95, extraCondition, 0.3, fishIndice, lake, fishImages, fishImagesCommon)
          decideFishInclusion(fishChanceToCome, 90, extraCondition, 0.5, fishIndice, lake, fishImages, fishImagesCommon)
          decideFishInclusion(fishChanceToCome, 85, extraCondition, 0.6, fishIndice, lake, fishImages, fishImagesCommon)
          decideFishInclusion(fishChanceToCome, 80, extraCondition, 0.7, fishIndice, lake, fishImages, fishImagesCommon)
          decideFishInclusion(fishChanceToCome, 75, extraCondition, 0.8, fishIndice, lake, fishImages, fishImagesCommon)
            
          // Update list of fish, after a new fish is added (or not)
          fish = [...document.querySelectorAll('.fish')]
          fish[fish.length - 1].style.top = `${parseInt(lakeStats.height / 2)}px`
          fish[fish.length - 1].style.left = `${parseInt(lakeStats.width / 1.5)}px`
          
        } 
      }
      
      if (fishImg.childNodes.length != values.slotIsEmpty) {
        alertBtn.style.background = values.alertHookingColor
        alertBtn.textContent = values.fishIsHooked
      } else {
        alertBtn.style.background = values.alertNotHookingColor
        alertBtn.textContent = values.fishIsNotComing
      }

      const boatStats = boat.getBoundingClientRect()
      const threadStats = thread.getBoundingClientRect()
      const hookStats = hook.getBoundingClientRect()
      
      fish.forEach((fishInstance, pos) => {
        
        // Manage how the fish shows up on screen
        const fishVisibility = Math.random()
        const currentFishVisibility = parseFloat(window.getComputedStyle(fishInstance).opacity)
        if (fishVisibility > values.unlikelyChance && fishVisibility < values.unlikelyChanceGreater) {
          if (currentFishVisibility < values.fishVisibilityCap) {
            fishInstance.style.opacity = `${currentFishVisibility + values.visibilityIncreaser}`
          } else {
            fishInstance.style.opacity = values.invisibleFish
          }
        }

        // Collect data and make fish move
        const fishStats = fishInstance.getBoundingClientRect()
        moveFish(fishStats, lakeStats, fishInstance)
        
        // Collect data for collision
        const isThereCollisionX = parseInt(hookStats.x) - parseInt(fishStats.x)
        const isThereCollisionY = parseInt(hookStats.y) - parseInt(fishStats.y)
        
        // If there is collision (fish XY is close to XY of the hook)
        if (hookRanges.includes(isThereCollisionX) && hookRanges.includes(isThereCollisionY)) {
          console.log('colisão...')
          
          const hookedFish = fishInstance.getAttribute('data-name')
          const hookedFishChance = fishPercentageChance[hookedFish]
          const isFishCaptured = checkHookChance(hookedFishChance)
          
          if (isFishCaptured) {
            // Add captured fish to the bucket if it is not full
            if (bucketPos < values.fullBucket) {
              bucketSpace[bucketPos].firstChild.setAttribute("src", `./assets/img/${hookedFish}.gif`)
              
              // Reduce fish's scale if it is a small fish
              if (easyFish.includes(hookedFish)) {
                bucketSpace[bucketPos].firstChild.style.scale = values.smallFishScaleReducer
              }
              
              thread.style.height = values.hookedPos
              const capturedFish = document.createElement("img")
              setupCapturedFish(capturedFish, hookedFish)
              capturedFish.style.top = `${threadStats.top + (hookStats.height * values.doubled)}px`
              capturedFish.style.left = `${threadStats.left - hookStats.width}px`
              fishImg.appendChild(capturedFish)
              // capturedFish.style.position = 'absolute'
              lake.removeChild(fish[pos])
              bucketPos++
            }
          } 
          // Fish scaped
          else {
            alertBtn.style.background = values.alertLostHookColor
            alertBtn.textContent = values.fishScaped
          }
        }
      })
      
    }, 200)
  }
}, 1000)

launcher.addEventListener('click', () => {
  launcher.getAttribute('class').split(' ').includes('enabled')
  ? launcher.className = 'win cls-std-btn disabled'
  : launcher.className = 'win cls-std-btn enabled'
})

fishFromGameTrigger.addEventListener('click', () => {
  selectWindow(windows, fishFromGameTemplate)
})

instructionsTrigger.addEventListener('click', () => {
  selectWindow(windows, instructionsTemplate)
})

window.addEventListener("keydown", (e) => {
  const boatPos = parseInt(window.getComputedStyle(boat).left)
  const rodPos = parseInt(window.getComputedStyle(rod).left)
  const boatStats = boat.getBoundingClientRect()
  const rodStats = rod.getBoundingClientRect()
  const threadStats = thread.getBoundingClientRect()

  switch(e.key) {
    case "a":
      boat.style.left = `${boatPos - 32}px`
      rod.style.left = `${boatStats.x + boatStats.width - 32}px`
      thread.style.left = `${rodStats.x + rodStats.width - 40}px`
      fishImg.childNodes.length != 0 ? fishImg.removeChild(fishImg.firstChild) : null
      break
    case "d":
      boat.style.left = `${boatPos + 32}px`
      rod.style.left = `${boatStats.x + boatStats.width}px`
      thread.style.left = `${rodStats.x + rodStats.width + 16}px`
      fishImg.childNodes.length != 0 ? fishImg.removeChild(fishImg.firstChild) : null
      break
    case "w":
      thread.style.height = `${threadStats.height - 20}px`
      break
    case "s":
      thread.style.height = `${threadStats.height + 20}px`
      fishImg.childNodes.length != 0 ? fishImg.removeChild(fishImg.firstChild) : null
      break
  }
})
