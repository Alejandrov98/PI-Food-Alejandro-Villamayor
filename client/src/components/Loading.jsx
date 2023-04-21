import loading from "../design/Loading.mp4"
import style from './loading.module.css'
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';


export default function Loading() {
  const history = useHistory();

  useEffect(() => {
    const video = document.getElementById("loading-video");
    if (video) {
      video.addEventListener("loadeddata", () => {
        video.play();
      });
    }

    const timeoutId = setTimeout(() => {
      history.push('/home');
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [history]);

  return (
    <div className={style.fix}>
      <video id="loading-video" src={loading} className={style.video}></video>
    </div>
  )
}