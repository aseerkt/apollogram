import { useState } from 'react';

export const Test = () => {
  const array = [
    {
      id: 1,
      component: <h1>Comp1</h1>,
      isVisible: true,
      info: <div>info1</div>,
    },

    {
      id: 2,
      component: <h1>Comp2</h1>,
      isVisible: true,
      info: <div>info2</div>,
    },

    {
      id: 3,
      component: <h1>Comp3</h1>,
      isVisible: true,
      info: <div>info3</div>,
    },

    {
      id: 4,
      component: <h1>Comp4</h1>,
      isVisible: true,
      info: <div>info4</div>,
    },
  ];
  const [items, setItems] = useState(array);

  const handleClick = (number) => {
    let showAll = false;
    const currentItem = items.find((item) => item.id === number);
    const restItems = items
      .filter((item) => item.id !== number)
      
    if (!currentItem.isVisible) {
      restItems.map(item => {
        item.isVisible = false;
        return item;
      })
    } else {
      restItems.map(item => {
        item.isVisible = true;
        return item;
      })
    }
    currentItem.isVisible = true;
    restItems.push(currentItem);
    const triggeredItems = restItems.sort(
      (a, b) => a.id - b.id
    );
    setItems(triggeredItems);
    
  };

  return (
    <div className='px-3 pt-1 pb-3 mt-1'>
      <div className='my-1 text-center row d-flex'>
        {items.map(({ id, component, isVisible, info }) => (
          <div
            key={id}
            className='mb-4 col-lg-3 col-md-6 bg-secondary justify-content-center'
            onClick={() => handleClick(id)}
          >
            {isVisible ? component : info}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
