import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import "./ChannelListMenu.css"

interface ChannelListMenuProps {
  onSelectChannel: (index: number) => void
  channels_src: string[]
  channelId: number
}

export const ChannelListMenu: React.FC<ChannelListMenuProps> = ({onSelectChannel,channels_src,channelId}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const style3 = {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: "5px",
    border: 0,
    margin: "10px 0px",
    color: "white",
    height: 40,
    padding: "0 5px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  };

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectChannel = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    onSelectChannel(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="center">
      <List aria-label="Channels" className="channel-list">
        <ListItem
          button
          aria-haspopup="true"
          onClick={handleClickListItem}
          style={style3}
        >
          <ListItemText primary={`CHANNEL ${channelId}`} />
        </ListItem>
      </List>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {channels_src.map((src, index) => (
          <MenuItem
            color="primary"
            style={style3}
            key={`channel${index}`}
            onClick={(event) => handleSelectChannel(event, index)}
            selected={index === channelId}
          >
            {`CHANNEL ${index}`}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
