import React from 'react'
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react'

import Profile from '../Profile'

function MyModal(props) {
  const [open, setOpen] = React.useState(false);
  const { contracts, address, ipfs} = props;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon><Icon name='question circle outline'/></Button>}
    >
      
      <Modal.Header>Arthor</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Profile contracts={props.contracts} address={props.address} ipfs={props.ipfs}/>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default MyModal;