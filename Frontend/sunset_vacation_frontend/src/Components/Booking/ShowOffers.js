import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ShowOffer(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  React.useEffect(()=>{
    if(props.propertyDetails != null && props.propertyDetails.offers.length > 0){
        setOpen(true);
    }
  }, [setOpen])

  let idx = 0;

  if(props.propertyDetails === null) {
    return(<div></div>);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Offers
            </ListSubheader>
          }
          >
            {props.propertyDetails.offers.map((offer) => {
                idx++;
                return(
                    <ListItem id={idx}>
                        <ListItemText>
                            {idx}. {offer.startDate.split('T')[0]} --- {offer.endDate.split('T')[0]}: {offer.amount} dollars
                        </ListItemText>
                    </ListItem>
                );
            })}
          </List>
        </Box>
      </Modal>
    </div>
  );
}
