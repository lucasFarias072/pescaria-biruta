

const values = {
  alertHookingColor: 'rgb(0, 222, 0)',
  alertNotHookingColor: 'rgb(10, 40, 20)',
  alertLostHookColor: 'rgb(128, 28, 0)',
  animationIntervalForGame: 500, // was 200
  animationIntervalForGamePreview: 1000,
  offsetSpeedBoat: 22,
  offsetSpeedThread: 11,
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
  threadHeightAfterCapture: '3.3rem',
  invisibleFish: '0',
  properCustomLeftOffsetRod: 32,
  properCustomLeftOffsetThread: 30, // less than rod, cuz it needs to be attached to the rod
  properRowsAmount: 3,
  screenHeight: window.innerHeight,
  screenWidth: window.innerWidth,
  slotIsEmpty: 0,
  smallFishScaleReducer: '0.92',
  stdBackground: 'linear-gradient(15deg, rgb(0, 86, 159), rgb(29, 145, 197), rgb(129, 179, 202))',
  stdTheme: 0,
  threadThreshold: 55,
  unlikelyChance: 0.96,
  visibilityIncreaser: 0.1
}

localStorage.getItem('theme') === null ? localStorage.setItem('theme', values.stdBackground) : null
localStorage.getItem('theme-id') === null ? localStorage.setItem('theme-id', values.stdTheme) : null

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

const fishPercentageChanceTable = {
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

// Populated later
const fishImages = []

const eachThemeColor = ['#444', '#333', '#222', '#111', 'black', 'white', 'aqua', 'yellow', 'mediumseagreen']

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

const hookRanges = [-4, -3, -2, -1, 0, 1, 2, 3, 4]

const eachFishName = Object.keys(fishPercentageChanceTable)

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

const setupFishSrcPath = (container, fixedPath, imgExtension) => {
  for(let fish of eachFishName) {container.push(`${fixedPath}${fish}${imgExtension}`)}
}

const adjustTime = (timeObject) => {
  return timeObject > 9 ? timeObject : `0${timeObject}`
}

const controlThreadThreshdhold = (threadHtml, thresholdVal) => {
  const threadHeight = parseInt(window.getComputedStyle(threadHtml).height)
  threadHeight < thresholdVal ? threadHtml.style.height = `${thresholdVal}px` : null
}

const updateAlertBox = (btnHtml, backgroundInk, txt) => {
  btnHtml.style.background = backgroundInk
  btnHtml.textContent = txt
}

const setupThreadStyle = (threadHtml, hookHtml, indicator) => {
  const morningThemes = [0, 1, 2] 
  const afternoonThemes = [3, 4]  
  const eveningThemes = [5, 6]    

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

const setupColorTheme = (htmlTagsGroup, eachThemeColorGroup, refVal) => {
  htmlTagsGroup.forEach(tag => tag.style.color = eachThemeColorGroup[refVal])
}

const setupDayTime = (timeObject) => {
  // const b4Morning = [5, 6]
  const morning = [7, 8, 9, 10]
  const afternoon = [11, 12, 13, 14, 15]
  const dusk = [16, 17]
  const earlyEvening = [19, 20, 21, 22, 23]
  const lateEvening = [0, 1, 2, 3]
  let pos
  let tObj = timeObject
  
  const assertions = [
    [tObj.h === 5 && tObj.m > 40 || tObj.h === 6, 0], // 5:41 às 6:59
    [morning.includes(tObj.h), 1], // 7 às 10:59
    [afternoon.includes(tObj.h), 2], // 11 às 15:59
    [dusk.includes(tObj.h) && tObj.m <= 40, 3], // 16 às 16:40
    [tObj.h === 16 && tObj.m > 40 || tObj.h === 17 && tObj.m <= 50, 4], // 16:41 às 17:50
    [tObj.h === 17 && tObj.m > 50 || tObj.h === 18, 5], // 17:51 às 18:59
    [earlyEvening.includes(tObj.h), 6], // 19 às 23:59
    [lateEvening.includes(tObj.h) || tObj.h === 4 && tObj.m <= 50, 7], // meia noite às 4:50
    [tObj.h === 4 && tObj.m > 50 || tObj.h === 5 && tObj.m <= 40, 8] // 4:51 às 5:40
  ]
  
  // for(let assertion of assertions) {console.log(assertion)}

  for(let i = 0; i < assertions.length; i++) {
    if (assertions[i][0]) {
      pos = assertions[i][1]
      break
    }
  }
  
  return pos
}

const watchThreadMovement = () => {
  setInterval(() => {
    thread.style.transform = `rotate(${applyOffset(1, 4)}deg)`
  }, 500)
}

const watchHookMovement = () => {
  setInterval(() => {
    const threadStats = thread.getBoundingClientRect()
    hook.style.top = `${threadStats.y - 60}px`
    hook.style.left = `${threadStats.x - 5}px`
  }, 10)
} 

const watchThreadStyle = () => {
  setInterval(() => {
    setupThreadStyle(thread, hook, parseInt(localStorage.getItem('theme-id')))
  }, 5000)
}

const watchSetupDayTime = () => {
  setInterval(() => {
    const currentTime = new Date()
    const clock = {h: currentTime.getHours(), m: currentTime.getMinutes(), s: currentTime.getSeconds()}
    // const clock = {h: 6, m: 15, s: 0}
    const themeColor = setupDayTime(clock)
    lake.style.background = themes[themeColor]
    localStorage.setItem('theme', themes[themeColor])
    localStorage.setItem('theme-id', themeColor)
    document.getElementById('h').textContent = adjustTime(clock.h)
    document.getElementById('min').textContent = adjustTime(clock.m)
    document.getElementById('sec').textContent = adjustTime(clock.s)
  }, 1000)
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
  txt.className = 'cls-ink mb'
  txt.textContent = msg
  where.appendChild(txt)
  
  for(let i = 0; i < fishPathsArray.length; i++) {
    const fishImg = document.createElement('img')
    isRare ? fishImg.classList.add('cls-rare-fish') : null
    fishImg.style.opacity = '1'
    fishImg.style.margin = '.3rem'
    fishImg.setAttribute('src', `./assets/img/${fishPathsArray[i]}.gif`)
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
    const fishName = img.split("/")[3].split(".gif")[0]
    const fishChanceToCapture = fishPercentageChanceTable[fishName]
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

const moveLake = (lakeHtml) => {
  // const bg = []
  // const htmlBackground = localStorage.getItem('theme')
  
  // let lakeOffsetMin = -4
  // let lakeOffsetMax = 5
  let minOffset = -1
  let maxOffset = 2
  // let threeGradients = 10
  // let fourGradients = 13
  // let numbers = ''
  // let newValue = ''
  
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
  
  setInterval(() => {
    lakeHtml.style.transform = `rotate(${getIndice(minOffset, maxOffset)}deg)`
    // const chanceToMoveGradient = Math.random()
    // if (chanceToMoveGradient > 0.98) {
    //   htmlLake.style.background = newValue
    // }
  }, 1000)
}

const checkSurfaceProximity = (fishHtml) => {
  const isFishNearLakeSurface = parseInt(window.getComputedStyle(fishHtml).top.split('px')[0]) < 5
  isFishNearLakeSurface ? fishHtml.style.top = `${getIndice(15, 30)}px` : null
}

const checkRightEdgeProximity = (fishHtml) => {
  const currentFishLeft = parseInt(window.getComputedStyle(fishHtml).left.split('px')[0])
  const isFishNearLeftEdge = currentFishLeft > 450
  isFishNearLeftEdge ? fishHtml.style.left = `${currentFishLeft + getIndice(-15, -30)}px` : null
}

const handleFishOpacity = (triggerVal, fishHtml, maxCap, capIncreaser) => {
  const opacityCap = 1.0
  const invisible = 0

  if (triggerVal === 5) {
    const chanceRate = Math.random()
    const currentOpacity = parseFloat(window.getComputedStyle(fishHtml).opacity)
    if (chanceRate > maxCap) {
      if (currentOpacity < opacityCap) {
        fishHtml.style.opacity = `${currentOpacity + capIncreaser}`
      } else {
        fishHtml.style.opacity = invisible
      }
    }
  }
}

const moveFish = (fishHtml) => {
  const offsetX = applyOffset(1, 34)
  const offsetY = applyOffset(17, 34)
  const chanceToMove = applyOffset(1, 13)

  let fishX = parseInt(fishHtml.style.top.split("px")[0])
  let fishY = parseInt(fishHtml.style.left.split("px")[0])
  
  if (chanceToMove === 1) {
    fishHtml.style.top = `${fishY + offsetY}px`
    fishHtml.style.transform = `rotate(${applyOffset(-88, 89)}deg)`
  } else if (chanceToMove === 2) {
    fishHtml.style.top = `${fishY - offsetY}px`
    fishHtml.style.transform = `rotate(${applyOffset(-88, 89)}deg)`
  } else if (chanceToMove === 3) {
    fishHtml.style.left = `${fishX + offsetX}px`
    fishHtml.style.transform = `rotate(${applyOffset(-88, 89)}deg)`
  } else if (chanceToMove === 4) {
    fishHtml.style.left = `${fishX - offsetX}px`
    fishHtml.style.transform = `rotate(${applyOffset(-88, 89)}deg)`
  } 
  // Manage how the fish shows up on screen
  else if (chanceToMove === 5) {
    handleFishOpacity(5, fishHtml, values.unlikelyChance, values.visibilityIncreaser)
  } else if (chanceToMove >= 10) {
    fishHtml.style.transform = `rotate(${applyOffset(-90, 91)}deg)`
  }
  
}

const checkHookChance = (fishPercentage) => {
  const systemChance = applyOffset(0, 101)
  return fishPercentage >= systemChance ? true : false
}

const watchBoatMovement = () => {
  let bounce = 0

  setInterval(() => {
    bounce > 2 ? bounce = 0 : bounce++
    bounce % 2 === 0 
    ? boat.style.transform = `rotate(${applyOffset(-7, 8)}deg)` 
    : boat.style.transform = `rotate(-${applyOffset(-7, 8)}deg)`
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

const applyCapturedFishCss = (capturedFish, capturedFishImg) => {
  capturedFish.style.position = 'absolute'
  capturedFish.setAttribute("src", `./assets/img/${capturedFishImg}.gif`)
  capturedFish.style.transform = 'rotate(270deg)'
  capturedFish.style.zIndex = '5'
  capturedFish.style.opacity = '1'
}

const captureFish = (threadRect, hookRect, hookedFish) => {
  const capturedFish = document.createElement("img")
  applyCapturedFishCss(capturedFish, hookedFish)
  capturedFish.style.top = `${threadRect.top + (hookRect.height * values.doubled)}px`
  capturedFish.style.left = `${threadRect.left - hookRect.width}px`
  return capturedFish
}

const triggerCaptureSystem = (fishName, statsDataSource) => {
  const hookedFishChance = statsDataSource[fishName]
  const isFishCaptured = checkHookChance(hookedFishChance)
  return isFishCaptured
}

const addFishToBucket = (bucketHtml, bucketSlotPos, fishName) => {
  bucketHtml[bucketSlotPos].firstChild.setAttribute("src", `./assets/img/${fishName}.gif`)
}

const throwSmallFishScaleReducer = (statement, bucketHtml, bucketSlotPos, proportionVal) => {
  statement ? bucketHtml[bucketSlotPos].firstChild.style.scale = proportionVal : null
}

const resetThreadPos = (threadHtml, refForHeight) => {
  threadHtml.style.height = refForHeight
}

setupFishSrcPath(fishImages, './assets/img/', '.gif')

loadFish(fishChart, eachSmallFish, 'Pequenos')
loadFish(fishChart, eachAverageFish, 'Médios')
loadFish(fishChart, eachLargeFish, 'Grandes')
loadFish(fishChart, eachRareFish, 'Raros', true)

// After the creation of the last dynamic content (this one above)
// Grouped Elements
const htmlInfoTexts = document.querySelectorAll('.cls-ink')
setupColorTheme(htmlInfoTexts, eachThemeColor, parseInt(localStorage.getItem('theme-id')))

createBucket(bucket, values.properRowsAmount)
const bucketSpace = [...document.querySelectorAll('.cls-slot')]

// Get tag element of each fish
let fish = [...document.querySelectorAll('.fish')]

watchBoatMovement()
watchThreadMovement()
watchThreadStyle()
watchHookMovement()
watchSetupDayTime()

// Check if game should start (it stops when true and game starts running)
const gameMustRunLoop = setInterval(() => {
  const isGameSupposedToRun = launcher.getAttribute('class').split(' ').includes('enabled')
  
  if(isGameSupposedToRun) {
    clearInterval(gameMustRunLoop)
    selectWindowMultiple(windows, [gameTemplate, gameResourcesTemplate])
    
    setInterval(() => {
      // console.log(`Peixes no lago: ${lake.childNodes.length}`)
      moveLake(lake)
      
      if (gameClock != values.creationTime) {
        gameClock += values.clockIncreaser
      } else {
        gameClock = values.clockRebooter
        
        // If lake is not full: take an indice and find the fish name to be 'possibly included'
        if (lake.childNodes.length < values.fullLake) {
          const fishIndice = getIndice(0, fishImages.length)
          const fishChanceToCome = fishPercentageChanceTable[fishImages[fishIndice].split("/")[3].split(".gif")[0]]
          
          const extraCondition = Math.random()

          decideFishInclusion(fishChanceToCome, 1, extraCondition, 0.9, fishIndice, lake, fishImages, fishImagesCommon)
          decideFishInclusion(fishChanceToCome, 95, extraCondition, 0.3, fishIndice, lake, fishImages, fishImagesCommon)
          decideFishInclusion(fishChanceToCome, 90, extraCondition, 0.5, fishIndice, lake, fishImages, fishImagesCommon)
          decideFishInclusion(fishChanceToCome, 85, extraCondition, 0.6, fishIndice, lake, fishImages, fishImagesCommon)
          decideFishInclusion(fishChanceToCome, 80, extraCondition, 0.7, fishIndice, lake, fishImages, fishImagesCommon)
          decideFishInclusion(fishChanceToCome, 75, extraCondition, 0.8, fishIndice, lake, fishImages, fishImagesCommon)
            
          // Update list of fish, after a new fish is added (or not)
          fish = [...document.querySelectorAll('.fish')]
          fish[fish.length - 1].style.top = `${values.screenHeight / 3}px`
          fish[fish.length - 1].style.left = `${values.screenWidth / 2}px`
          
        } 
      }
      
      fishImg.childNodes.length != values.slotIsEmpty
      ? updateAlertBox(alertBtn, values.alertHookingColor, values.fishIsHooked)
      : updateAlertBox(alertBtn, values.alertNotHookingColor, values.fishIsNotComing)
      
      const threadStats = thread.getBoundingClientRect()
      const hookStats = hook.getBoundingClientRect()
      
      fish.forEach((fishInstance, pos) => {
  
        // Collect data and make fish move
        const fishStats = fishInstance.getBoundingClientRect()
        moveFish(fishInstance)
        checkSurfaceProximity(fishInstance)
        checkRightEdgeProximity(fishInstance)
        
        // Collect data for collision
        const isThereCollisionX = parseInt(hookStats.x) - parseInt(fishStats.x)
        const isThereCollisionY = parseInt(hookStats.y) - parseInt(fishStats.y)
        
        // If there is collision (fish XY is close to XY of the hook)
        if (hookRanges.includes(isThereCollisionX) && hookRanges.includes(isThereCollisionY)) {
          // console.log('colisão...')
          
          const hookedFish = fishInstance.getAttribute('data-name')
          const isFishCaptured = triggerCaptureSystem(hookedFish, fishPercentageChanceTable)
          
          if (isFishCaptured) {
            // If bucket is not full
            if (bucketPos < values.fullBucket) {
              addFishToBucket(bucketSpace, bucketPos, hookedFish)
              
              // Reduce fish's scale on screen if it is a small one
              throwSmallFishScaleReducer(
                easyFish.includes(hookedFish), bucketSpace, bucketPos, values.smallFishScaleReducer
              )
              
              resetThreadPos(thread, values.threadHeightAfterCapture)
              const capturedFish = captureFish(threadStats, hookStats, hookedFish)
              fishImg.appendChild(capturedFish)
              lake.removeChild(fish[pos])
              bucketPos++
            }
          } 
          // Fish scaped
          else {
            updateAlertBox(alertBtn, values.alertLostHookColor, values.fishScaped)
          }
        }
      })
      
    }, values.animationIntervalForGame)
  }
}, values.animationIntervalForGamePreview)

launcher.addEventListener('click', () => {
  launcher.getAttribute('class').split(' ').includes('enabled')
  ? launcher.className = 'win cls-std-btn disabled'
  : launcher.className = 'win cls-std-btn enabled'
  
  gameTemplate.style.background = themes[parseInt(localStorage.getItem('theme-id'))]
})

fishFromGameTrigger.addEventListener('click', () => {
  selectWindow(windows, fishFromGameTemplate)
})

instructionsTrigger.addEventListener('click', () => {
  selectWindow(windows, instructionsTemplate)
})

window.addEventListener("keydown", (e) => {
  const boatPos = parseInt(window.getComputedStyle(boat).left)
  const boatStats = boat.getBoundingClientRect()
  const rodStats = rod.getBoundingClientRect()
  const threadStats = thread.getBoundingClientRect()

  switch(e.key) {
    case "a":
      boat.style.left = `${boatPos - values.offsetSpeedBoat}px`
      rod.style.left = `${boatStats.x + boatStats.width - values.properCustomLeftOffsetRod}px`
      thread.style.left = `${rodStats.x + rodStats.width - values.properCustomLeftOffsetThread}px`
      fishImg.childNodes.length != 0 ? fishImg.removeChild(fishImg.firstChild) : null
      break
    case "d":
      boat.style.left = `${boatPos + values.offsetSpeedBoat}px`
      rod.style.left = `${boatStats.x + boatStats.width}px`
      thread.style.left = `${rodStats.x + rodStats.width}px`
      fishImg.childNodes.length != 0 ? fishImg.removeChild(fishImg.firstChild) : null
      break
    case "w":
      thread.style.height = `${threadStats.height - values.offsetSpeedThread}px`
      controlThreadThreshdhold(thread, values.threadThreshold)
      break
    case "s":
      thread.style.height = `${threadStats.height + values.offsetSpeedThread}px`
      fishImg.childNodes.length != 0 ? fishImg.removeChild(fishImg.firstChild) : null
      break
  }
})

window.addEventListener("keyup", (e) => {
  switch(e.key) {
  case "w":
    controlThreadThreshdhold(thread, values.threadThreshold)
    break
  }
})