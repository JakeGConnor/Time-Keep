import { IonContent, IonFooter, IonAlert, IonHeader, IonPage, IonList, IonItem, IonTitle, IonToolbar, IonButton, IonPopover, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';
import CardList from '../components/CardList';
import './Jobs.css';

interface Job {
  id: string;
  name: string;
  description: string;
  num: number;
}

const Jobs: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [jobName, setJobName] = useState('');
  const [jobNum, setJobNum] = useState<number>(0);
  const [jobDesc, setJobDesc] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [highestJobNum, setHighestJobNum] = useState(0);

  const handleJobClick = async () => {
    if (!showPopover) {
      setShowPopover(true);
      try {
        const jobsCollection = collection(firestore, 'jobs');
        const querySnapshot = await getDocs(jobsCollection);
        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Job[];

        const highestNum = jobsData.reduce((max, job) => (job.num > max ? job.num : max), 0);
        setHighestJobNum(highestNum);
        let nextNum = Number(highestJobNum) + Number(1);
        setJobNum(nextNum);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    } else {
      setShowPopover(false);
    }
  };

  const handleNewJob = () => {
    newJob(jobName, jobNum, jobDesc);
  };

  const newJob = async (jobName: string, jobNum: number, jobDesc: string) => {
    if (!jobName || jobNum === null || !jobDesc) {
      setShowErrorAlert(true);
      return;
    }

    const jobsCollection = collection(firestore, 'jobs');
    const jobDoc = { name: jobName, num: jobNum, description: jobDesc };

    try {
      await addDoc(jobsCollection, jobDoc);
      setJobName('');
      setJobNum(jobNum);
      setJobDesc('');
      setShowPopover(false);
    } catch (error) {
      console.error('Error adding job:', error);
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
                      <IonInput label="Job Number (Change at Your Own Risk)" labelPlacement='stacked'
                        value={jobNum} onIonChange={(e) => setJobNum(Number(e.detail.value!))}>
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
