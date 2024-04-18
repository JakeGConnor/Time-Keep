import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Tab1.css';

const clockIn = () => {
  console.log('Button clicked!');
};

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Time Clock</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Time Clock</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton className="clockIn" onClick={clockIn}>Clock In</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
