import {StyledFloorRow, StyledFloorTile} from './FloorRow.styled'

const FloorRow = props => {
  let minusPointArray = [-1, -1, -2, -2, -2, -3, -3]

  const updateActiveTiles = clickedTile => {
    let newActiveTiles = [...props.activeMinusTiles]
    let indexOfLastTrue = newActiveTiles.lastIndexOf(true)

    if (clickedTile === indexOfLastTrue) {
      newActiveTiles.forEach((tile, index) => (newActiveTiles[index] = false))
    } else {
      for (let i = 0; i <= clickedTile; i++) {
        newActiveTiles[i] = true
      }

      for (let i = 6; i > clickedTile; i--) {
        newActiveTiles[i] = false
      }
    }

    props.setActiveMinusTiles(newActiveTiles)
  }

  return (
    <StyledFloorRow gameEnd={props.gameEnd}>
      <p>Minus Points</p>
      <div className="floor-row-wrapper">
        {minusPointArray.map((item, index) => (
          <StyledFloorTile
            key={index}
            active={props.activeMinusTiles[index]}
            tileCount={index}
            onClick={() => {
              updateActiveTiles(index)
            }}
          >
            {item}
          </StyledFloorTile>
        ))}
      </div>
    </StyledFloorRow>
  )
}

export default FloorRow
