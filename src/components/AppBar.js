import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Context from '../context';

export default function MyAppBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [option, setOption] = useState('anglicized_name');
  const {
    getByCode,
    getByName,
    getByAnglicizedName,
    getByRegion,
    getByCountry,
  } = useContext(Context);

  function search() {
    switch (option) {
      case 'anglicized_name':
        getByAnglicizedName(searchTerm);
        break;
      case 'country':
        getByCountry(searchTerm);
        break;
      case 'region':
        getByRegion(searchTerm);
        break;
      case 'name':
        getByName(searchTerm);
        break;
      case 'code':
        getByCode(searchTerm);
        break;
      default:
        alert('Invalid selection');
        break;
    }
  }

  return (
    <AppBar position="relative" id="addBar">
      <Toolbar>
        <div className="toolbar__tools">
          <TextField
            value={searchTerm}
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="View languages by..."
          />
          <Select value={option} onChange={(e) => setOption(e.target.value)}>
            <MenuItem value="anglicized_name">Anglicized Name</MenuItem>
            <MenuItem value="country">Country</MenuItem>
            <MenuItem value="region">Region</MenuItem>
            <MenuItem value="name">Language Name</MenuItem>
            <MenuItem value="code">Language Code</MenuItem>
          </Select>
          <Button
            onClick={search}
            variant="contained"
            color="secondary"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
