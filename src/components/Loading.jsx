import React from "react";
// import { SpinnerRoundOutlined } from 'spinners-react';
import loadingAnimationData from "../assets/json/loading.json";
import Lottie from "react-lottie";

const Loading = () => {
  return (
    <div className="h-100 flex items-center justify-center">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: loadingAnimationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={300}
        width={300}
        isStopped={false}
        isPaused={false}
      />
    </div>
  );
};

export default Loading;
