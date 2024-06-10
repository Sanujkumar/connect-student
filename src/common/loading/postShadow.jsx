import React from 'react';
import { Skeleton } from "../../components/ui/skeleton";

const data = Array.from({ length: 6 });  // Create an array with 10 elements
const PostShadow = () => {
    return (
        <div className="flex flex-col  justify-center items-center mx-auto h-full overflow-hidden w-full">
            {
                data.map((_, index) => (
                    <div key={index} className="w-full  ">
                        <div className='flex items-center gap-x-2 m-2'>
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <Skeleton className="w-[30%] h-6 rounded-full" />
                        </div>
                        <div>
                            <Skeleton className="w-full h-40 " />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default PostShadow;
