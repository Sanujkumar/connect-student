import React, {  useState } from "react";
import { CiShare1 } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsBookmark } from "react-icons/bs";
import { BiMessage } from "react-icons/bi";
import { RWebShare } from "react-web-share";
import LikeComponents from "./LikeComponents";
import Comment from "./Comment";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover"
import { Skeleton } from "../../components/ui/skeleton";
import TooltipD from "../../common/tooltipdesign/TooltipD";
import { useSelector } from "react-redux";
import LostShadow from "../../common/loading/postShadow"

const PostDesign = ({ data }) => {
  const [commentsVisibility, setCommentsVisibility] = useState({});
  const load=useSelector(state=>state.auth.loading)
  const handleComment = async (post_id) => {
    const isVisible = commentsVisibility[post_id];
    setCommentsVisibility((prev) => ({
      ...prev,
      [post_id]: !isVisible,
    }));
  };

  return (
    <div >
      {
        load? (<LostShadow/>):
      
      ( data.map((item, index) => (
        <div
          className="flex-row justify-center shadow-sm  p-2 w-full bg-white border-x border-t cursor-pointer"
          key={index}
        >
          <div className="flex mb-2 border-b p-[0.40rem] mx-4 hover:bg-neutral-100">
            <div className="flex gap-2 w-[75%]">
              <div className="item-center">
                <Popover className="relative">
                  <PopoverTrigger>
                    <img
                      src={item.post_by?.image}
                      alt="user_image"
                      className="w-[2.7rem] h-[2.7rem] object-cover place-self-center place-items-center border rounded-full"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="absolute flex gap-x-4 p-2 rounded-lg shadow-lg">
                    <div>
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-40 h-4 rounded-full" />
                      <Skeleton className="w-24 h-4 rounded-full" />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-y-[0rem] text-[0.9rem] font-[1rem]">
                <p className="font-semibold">{item.post_by?.firstName}</p>
                <p className="text-[0.7rem]">
                  {new Date(item.date).toISOString().split("T")[0]}
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end place-items-center items-center w-[15%]">
              <div className="flex gap-x-4 items-center">
                <HiOutlineDotsHorizontal size={20} />
              </div>
            </div>
          </div>

          <div className="justify-start ml-6">
            <p className="text-sm text-black text-start mb-1">
              {item.description}
            </p>
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt=".."
                className="h-[280px] w-full mx-auto rounded-sm m-2 object-cover"
              />
            )}
          </div>

          <div className="flex justify-end gap-x-20 p-2 mt-4 mx-4 items-center">

            <TooltipD componentHover={<LikeComponents
              
              item_id={item._id}
              isLiked={item.isLiked}
              total_like={item.total_like_count}
            />} title={"like"} />


            <TooltipD componentHover={
              <div className="flex gap-x-1 items-center hover:text-cyan-800">
                <button onClick={() => handleComment(item._id)}>
                  <BiMessage size={32} className="cursor-pointer  hover:bg-cyan-100 rounded-full p-2" />
                </button>
                {item.total_comments}   </div>}
              title={"comment"} />

            <TooltipD componentHover={
              <p className="flex gap-2 items-center">
                <RWebShare
                  data={{
                    text: "Like humans, flamingos make friends for life",
                    url: "https://on.natgeo.com/2zHaNup",
                    title: "Flamingos",
                  }}
                  onClick={() => console.log("shared successfully!")}
                >
                  <button>
                    <CiShare1 size={32} className="cursor-pointer  hover:bg-gray-200 hover:rounded-full p-2"/>
                  </button>
                </RWebShare>
                102
              </p>}
              title={"share"} />
            <TooltipD componentHover={
              <p className="items-center">
                <BsBookmark size={32} className="cursor-pointer  hover:bg-cyan-100 hover:rounded-full p-2 "/> </p>}
              title={"Bookmark"} />
          </div>
          {commentsVisibility[item._id] && (
            <Comment post_id={item._id} />
          )}
        </div>
      )))} 
    </div>
  );
};

export default PostDesign;
