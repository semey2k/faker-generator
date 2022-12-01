import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { faker } from '@faker-js/faker';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import List from './List';
import { useLazyLoading } from './onScrollLazy';

function App() {
  const [values, setValues] = useState([]);
  const [locale, setLocale] = useState('en');

  const headers = [
    { label: 'First Name', key: 'name' },
    { label: 'Phone', key: 'phone' },
    { label: 'Id', key: 'id' },
    { label: 'City', key: 'city' },
    { label: 'Street', key: 'street' },
  ];

  useEffect(() => {
    const defaultValues = [];

    for (let i = 0; i < 20; i++) {
      defaultValues.push({
        name: faker.name.fullName(),
        phone: faker.phone.number(),
        id: faker.datatype.uuid(),
        city: faker.address.city(),
        street: faker.address.streetAddress(),
      });
    }

    setValues(defaultValues);
  }, []);

  const handleChanger = () => {
    const generateValues = [];

    if (locale === 'ru') {
      faker.setLocale('ru');
    } else if (locale === 'en') {
      faker.setLocale('en');
    } else {
      faker.setLocale('uk');
    }

    for (let i = 0; i < 20; i++) {
      generateValues.push({
        name: faker.name.fullName(),
        phone: faker.phone.number(),
        id: faker.datatype.uuid(),
        city: faker.address.city(),
        street: faker.address.streetAddress(),
      });
    }

    setValues(generateValues);
  };

  const append = () => {
    const appendValues = [];
    for (let i = 0; i < 10; i++) {
      appendValues.push({
        name: faker.name.fullName(),
        phone: faker.phone.number(),
        id: faker.datatype.uuid(),
        city: faker.address.city(),
        street: faker.address.streetAddress(),
      });
    }
    return appendValues;
  };

  const appendItems = useCallback(() => {
    setValues([...values, ...append()]);
  }, [values, setValues]);

  const [onScroll, containerRef] = useLazyLoading({
    onIntersection: appendItems,
    delay: 1200,
  });

  const handleChange = (event) => {
    setLocale(event.target.value);
  };

  return (
    <div className="App">
      <Container ref={containerRef} onScroll={onScroll}>
        <Box sx={{ minWidth: 120, display: 'flex', justifyContent: 'center', margin: 5 }}>
          <FormControl sx={{ m: 1, minWidth: 150, backgroundColor: '#fff' }}>
            <InputLabel id="demo-simple-select-label">Name Set</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={locale}
              label="Name Set"
              onChange={handleChange}>
              <MenuItem value={'en'}>English</MenuItem>
              <MenuItem value={'ru'}>Russian</MenuItem>
              <MenuItem value={'ukr'}>Ukrainian</MenuItem>
            </Select>
          </FormControl>

          <Button sx={{ m: 1 }} variant="contained" size="large" onClick={() => handleChanger()}>
            Generate
          </Button>
        </Box>
        <List items={values} headers={headers} />
      </Container>
    </div>
  );
}

const Container = styled.div`
  max-height: 100vh;
  overflow-y: scroll;
`;

export default App;
