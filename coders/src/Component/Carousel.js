import React, { useState } from 'react';

function ControlledCarousel({content}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>{content[0].title}</h3>
          <p>{content[0].text}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>{content[1].title}</h3>
          <p>{content[1].text}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>{content[2].title}</h3>
          <p>
            {content[2].text}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;





const content = [
    {
        title:'how to play',
        text:<>Move player pressing WASD or arrows on your keyboard. 
        <br/>Press Shift to move faster.
        <br/>Press SPACE to interact with objects and characters.</>,
    },
    {
        title:'a tbs game',
        text:<>The game is a TBS(turn based strategy), where your robot fights against a foe's one with brutal attacks!, every turn you can use some enhancements called "CHIP", that allows your robot to perform some special actions, like double damage attacks or status shots! only the toughest will survive!! </>,
    },
    {
        title:'become invincible',
        text:<>Gain points and get stronger collecting special chips and rare from the shop</>,
    },
]