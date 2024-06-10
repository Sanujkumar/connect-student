import React, { useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { likePost } from "../../service/operations/PostApi";
import { useSelector } from 'react-redux';


const LikeComponents = ({ item_id, isLiked,total_like }) => {
  const [likeInst, setLikeInst] = useState(isLiked);
  const token = useSelector((state) => state.auth.token);
  const [totalLike,setLike]= useState(total_like);

  const handleClick = () => {
    likePost(item_id,token);
    setLikeInst(!likeInst);
    if(likeInst){
        setLike(totalLike-1);
    }else{
        setLike(totalLike+1);
    }
  };

  return (
    <div className='flex gap-x-1 hover:text-green-700 items-center'>
    <button onClick={handleClick} className="cursor-pointer  hover:bg-green-100 rounded-full p-2">
      {likeInst ? <BiSolidLike /> : <AiOutlineLike />}
    </button>
    {totalLike}
    </div>
  );
};

export default LikeComponents;
