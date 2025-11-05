import React from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// simple guard to prevent double-join in StrictMode
let __joinedOnce = false;

const Room = () => {
    const appId = Number(process.env.REACT_APP_ZEGO_APP_ID);
    const serverSecret = process.env.REACT_APP_ZEGO_SERVER_SECRET;
    console.log("App ID:", appId);
    console.log("Server Secret:", serverSecret);
    const { roomid } = useParams();

    const meeting =(element)=>{
      if (!element) return;
      if (__joinedOnce) {
        console.warn('[ZEGOCloud] joinRoom repeat !! (blocked)');
        return;
      }
      __joinedOnce = true;

      const token= ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomid,
        Date.now().toString(),
        Date.now().toString()
      );

      const zc=ZegoUIKitPrebuilt.create(token);
      zc.joinRoom({
        container:element,
        scenario:{
          // fix typo: OneOnOneCall (was OneONoneCall)
          mode: ZegoUIKitPrebuilt.OneOnOneCall
        },
        showScreenSharingButton:true,
        sharedLinks: [{
          name: "copy link",
          url: window.location.href,
        }],
      });
    };

    return (
        <div ref={meeting} style={{width: "100vw", height: "100vh"}}>
        </div>
    );
};

export default Room;
