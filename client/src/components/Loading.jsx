import loading from "../design/Loading.mp4"
import style from './loading.module.css'
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';


export default function Loading() {
  const history = useHistory(); //definimos el hook useHistory para redirigir al usuario a la página de inicio después de que termine la pantalla de carga.

  useEffect(() => {
    const video = document.getElementById("loading-video");
    if (video) {
      video.addEventListener("loadeddata", () => {
        video.play();
      });
    }

    const timeoutId = setTimeout(() => {
      history.push('/home');
    }, 2000); //reproducir automáticamente el video de carga después de que se haya cargado completamente. También definimos un temporizador para redirigir al usuario después de 2 segundos.

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