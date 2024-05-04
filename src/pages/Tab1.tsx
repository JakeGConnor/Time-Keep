import { IonButton, IonContent, IonToggle, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [clockedIn, setClockedIn] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>('');
  const user = collection(firestore, 'users');

  const clockInOut = async () => {
    const holdTime = collection(firestore, 'holdTime');

    try {
      if (clockedIn) {
        // Clock out
        const querySnapshot = await getDocs(holdTime);
        querySnapshot.forEach((doc) => {
          if (doc.data().user === "Jake" && !doc.data().clockout) {
            const docRef = doc.ref;
            updateDoc(docRef, { clockout: currentDate });
            console.log('Clock Out: Document updated successfully!');
          }
        });
      } else {
        // Clock in
        const timeDoc = {
          clockin: currentDate,
          clockout: "",
          user: "Jake",
        };
        await addDoc(holdTime, timeDoc);
        console.log('Clock In: Document added successfully!');
      }
      setClockedIn(prevState => !prevState); // Toggle clockedIn state based on previous state
    } catch (error) {
      console.error('Error: ', error);
    }
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
            <IonTitle id="PT" size="large">Time Clock</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>{currentDate}</p>
        <IonContent>
          <IonButton className="clockIn" onClick={clockInOut}>
            {clockedIn ? "Clock Out" : "Clock In"}
          </IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;