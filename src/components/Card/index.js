import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Container, Label } from './styles';

const Card = ({ data, index }) => {
  const ref = useRef();

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, id: data.id, content: data.content },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;
      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      console.log(targetCenter);
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
