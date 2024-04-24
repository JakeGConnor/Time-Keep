import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Jobs.css';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';

const Jobs: React.FC = () => {

  const newJob = () => {
    const holdJob = collection(firestore, 'jobs');



  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Jobs</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>Jobs</h1>
        <IonFooter class = "Footer">
          <IonButton id="NewJob" className="NewJob" onClick={newJob}>New Job</IonButton>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Jobs;
