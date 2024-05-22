import { IonContent, IonFooter, IonAlert, IonHeader, IonPage, IonList, IonItem, IonTitle, IonToolbar, IonButton, IonPopover, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';
import CardList from '../components/CardList';
import './Jobs.css';

const Jobs: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [jobName, setJobName] = useState('');
  const [jobNum, setJobNum] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleJobClick = () => {
    if(showPopover == false){
      setShowPopover(true);
      
    }
    else{setShowPopover(false);}
  };

  const handleNewJob = () => {
    newJob(jobName, jobNum, jobDesc)
  };

  const newJob = async (jobName: string, jobNum: string, jobDesc: string) => {
    if (jobName === '' || jobNum === '' || jobDesc === '') {
      setShowErrorAlert(true);
    } else {
      const holdJob = collection(firestore, 'jobs');
  
      const jobDoc = {
        name: jobName,
        num: jobNum,
        description: jobDesc,
      };
  
      try {
        await addDoc(holdJob, jobDoc);
        setJobName('');
        setJobNum('');
        setJobDesc('');
        setShowPopover(false);
      } catch (error) {
        console.error('Error: ', error);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CardList />
        <IonFooter id="Footer">
          <IonButton id="NewJob" className="NewJob" 
              onClick={handleJobClick}>New Job</IonButton>
              <IonPopover isOpen={showPopover} alignment='center'>
                <IonContent class="NewJob-Block">
                  <h2>New Job</h2>
                  <IonList>
                    <IonItem>
                      <IonInput label="Enter Job Name" labelPlacement='stacked'
                        value={jobName} onIonChange={(e) => setJobName(e.detail.value!)}>   
                      </IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput label="Enter Job Number" labelPlacement='stacked'
                        value={jobNum} onIonChange={(e) => setJobNum(e.detail.value!)}>
                      </IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput label="Enter Description" labelPlacement='stacked'
                        value={jobDesc} onIonChange={(e) => setJobDesc(e.detail.value!)}>
                      </IonInput>
                    </IonItem>
                    <IonItem>
                      <IonButton onClick={handleNewJob} className="NewJob" 
                        id="NewJob">Enter Job</IonButton>
                    </IonItem>
                  </IonList>
                </IonContent>
              </IonPopover>
        </IonFooter>
      </IonContent>
      <IonAlert
        isOpen={showErrorAlert}
        onDidDismiss={() => setShowErrorAlert(false)}
        header="Error"
        message="All fields are required"
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default Jobs;
