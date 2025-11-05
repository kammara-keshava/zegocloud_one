import React, { useRef, useEffect } from 'react';
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

  // keep SDK instance so we can destroy it on unmount
  const zcRef = useRef(null);

  const meeting = (element) => {
    if (!element) return;
    if (__joinedOnce) {
      console.warn('[ZEGOCloud] joinRoom repeat !! (blocked)');
      return;
    }
    __joinedOnce = true;

    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomid,
      Date.now().toString(),
      Date.now().toString()
    );

    const zc = ZegoUIKitPrebuilt.create(token);
    zcRef.current = zc;

    zc.joinRoom({
      container: element,
      scenario: {
        // fix typo: OneOnOneCall
        mode: ZegoUIKitPrebuilt.OneOnOneCall
      },
      showScreenSharingButton: true,
      sharedLinks: [{
        name: "copy link",
        url: window.location.href,
      }],
    });
  };

  // CLEANUP when leaving this route
  useEffect(() => {
    return () => {
      try {
        // Prefer destroy(); if needed you can also call leaveRoom()
        zcRef.current?.destroy?.();
      } catch (e) {
        console.warn('ZEGO destroy failed (ignored):', e);
      } finally {
        zcRef.current = null;
        __joinedOnce = false; // allow future joins
        // hard-stop any leftover tracks just in case
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // no-op; SDK should release, this is just a safety comment
        }
      }
    };
  }, []);

  return (
    <div ref={meeting} style={{ width: "100vw", height: "100vh" }}>
    </div>
  );
};

export default Room;
