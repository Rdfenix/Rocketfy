import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Container, Label } from './styles';
import BoardCOntext from '../Board/context';

const Card = ({ data, index, listIndex }) => {
  const ref = useRef();
  const CARD = 'CARD';
  const { move } = useContext(BoardCOntext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: CARD, id: data.id, index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: CARD,
    hover(item, monitor) {
      const draggedIndex = item.index;
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;
      const targetIndex = index;
      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop < targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => (
          <Label key={label} color={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt='' />}
    </Container>
  );
};

export default Card;
