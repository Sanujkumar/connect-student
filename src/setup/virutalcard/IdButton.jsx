import React from 'react'
import { useDispatch } from 'react-redux';
import { setcard } from '../../dataHouse/slice/idcardSlice';
import { changeside } from '../../dataHouse/slice/IdbackSideslice';
import { Button } from '../../components/ui/button';
const IdButton = () => {

  const usedispatch = useDispatch();
  const clickHandle = () => {
    usedispatch(setcard());
  }
  const backside = () => {
    usedispatch(changeside());
  }
  return (

    <div>
      <div className='grid grid-cols-2 justify-around gap-4 mt-6 mb-2 text-black' >

        <Button onClick={clickHandle}> close</Button>
        <Button onClick={backside}>back side</Button>

      </div>
    </div>
  )
};

export default IdButton;
