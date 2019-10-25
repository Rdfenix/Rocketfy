import React from 'react';
import List from '../List';
import { Container } from './styles';
import { loadLists } from '../../services/api';

const lists = loadLists();

const Board = () => {
  return (
    <Container>
      {lists.map(list => (
        <List key={list.title} data={list} />
      ))}
    </Container>
  );
};

export default Board;
