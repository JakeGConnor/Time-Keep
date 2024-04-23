import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage, auth } from '../firebase/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import './Tab1.css';

const Tab1: React.FC = () => {

  class TimeCard {

  }

  const [currentDate, setCurrentDate] = useState<string>('');

  const holdTime = collection(firestore, 'holdTime');

  const clockIn = () => {
    const currtime = {currentDate};
    console.log(currtime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toLocaleString());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Time Clock</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen id="T1B">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Time Clock</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>{currentDate}</p>
        <IonButton className="clockIn" onClick={clockIn}>Clock In</IonButton> 
      </IonContent>
    </IonPage>
  );
};

export default Tab1;