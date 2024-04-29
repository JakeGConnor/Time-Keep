import { IonContent, IonFooter, IonHeader, IonPage, IonList, IonItem, IonTitle, IonToolbar, IonButton, IonPopover, IonInput } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';
import './Jobs.css';

const Jobs: React.FC = () => {

  const[jobName, setJobName] = useState('');
  const[jobNum, setJobNum] = useState('');
  const[jobDesc, setJobDesc] = useState('');

  const handleNewJob = () => {
    newJob(jobName, jobNum, jobDesc)
  }

  const newJob = async(jobName: string, jobNum: string, jobDesc: string) => {
    const holdJob = collection(firestore, 'jobs');

    const jobDoc = {
      name: jobName,
      num: jobNum,
      description: jobDesc
    }

    try {
      await addDoc(holdJob, jobDoc);
    } catch (error) {
      console.error('Error: ', error);
    }
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
          <IonButton id="NewJob" className="NewJob">New Job</IonButton>
            <IonPopover trigger="NewJob" triggerAction='click' alignment='center'>
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
                    <IonInput label="Job Description" labelPlacement='stacked'
                      value={jobDesc} onIonChange={(e) => setJobDesc(e.detail.value!)}>
                    </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonButton onClick={handleNewJob} className="NewJob">Enter Job</IonButton>
                  </IonItem>
                </IonList>
              </IonContent>
            </IonPopover>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Jobs;