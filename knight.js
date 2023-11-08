const placements = new Map()

const knightMoves = (x, y) => {
	const positionX = x
	const positionY = y
	let position

	const moveList = [
		[1, 2],
		[1, -2],
		[-1, 2],
		[-1, -2],
		[2, 1],
		[2, -1],
		[-2, 1],
		[-2, -1],
	]

	const getPosition = () => position
	const setPosition = (newPosition) => {
		position ||= newPosition
	}

	const location = () => `${x}, ${y}`

	const currentMoves = () => {
		return moveList.map(positionChange).filter(Boolean)
	}

	const positionChange = ([changeX, changeY]) => {
		const [newX, newY] = [positionX + changeX, positionY + changeY]
		if (0 <= newX && newX < 8 && 0 <= newY && y < 8) {
			return knightMoves(newX, newY)
		}
	}

	if (placements.has(location())) {
		return placements.get(location())
	} else {
		const newSpace = { location, getPosition, setPosition, currentMoves }
		placements.set(location(), newSpace)
		return newSpace
	}
}

const travail = (start, end) => {
	placements.clear()

	const startPoint = knightMoves(...start)
	const endPoint = knightMoves(...end)

	const queue = [endPoint]
	while (!queue.includes(startPoint)) {
		const currentSpace = queue.shift()

		const enqueueList = currentSpace.currentMoves()
		enqueueList.forEach((space) => {
			space.setPosition(currentSpace)
		})
		queue.push(...enqueueList)
	}

	const pathing = [startPoint]
	while (!pathing.includes(endPoint)) {
		const nextSpace = pathing.at(-1).getPosition()
		pathing.push(nextSpace)
	}

	console.log(`The shortest path was ${pathing.length - 1} moves`)
	console.log("The moves were: ")
	pathing.forEach((space) => console.log(space.location()))
}

travail([0, 0], [1, 2])

travail([3, 3], [0, 0])
