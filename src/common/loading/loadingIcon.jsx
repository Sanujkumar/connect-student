import React from 'react';
import { ColorRing } from 'react-loader-spinner';


const loadingIcon = () => {
  return (
    <div className=" flex justify-center items-center mx-auto">
      <ColorRing
        className="mx-auto border-white p-4"
        visible={true}
        height="40"
        width="40"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />

    </div>
  )
}

export default loadingIcon;
