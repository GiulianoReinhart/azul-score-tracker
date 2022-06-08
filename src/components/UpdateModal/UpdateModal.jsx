import {StyledUpdateModal} from './UpdateModal.styled'
import {CgClose} from 'react-icons/cg'
import {useTheme} from 'styled-components'

const UpdateModal = props => {
  const theme = useTheme()

  const closeModal = () => {
    props.setModal(false)
    props.setCookie('version', props.version, {path: '/'})
  }

  return (
    <StyledUpdateModal>
      <CgClose size="4rem" color={theme.light} onClick={closeModal} />
      <div className="modal-wrapper">
        <h2>Version 1.3</h2>
        <ul>
          <li>
            Added reset/new game button. First click makes the button shake as a
            warning, second click clears everything.
          </li>
          <li>
            Refreshing the page won’t clear your data (or theme), now
            everything’s stored in a cookie.
          </li>
          <li>Small visual adjustments</li>
        </ul>
        <h2>Version 1.2</h2>
        <ul>
          <li>
            Instead of having to manually disable a tile before enabling another
            one in the same row, this happens automatically now.
          </li>
          <li>
            Fixed a bug where the points of the last round were added twice to
            the total points.
          </li>
          <li>I wonder what happens if I click on the logo 🤷‍♂️</li>
        </ul>
      </div>
    </StyledUpdateModal>
  )
}

export default UpdateModal
