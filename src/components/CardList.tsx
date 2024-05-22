import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle } from '@ionic/react';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';

interface Job {
  id: string;
  name: string;
  description: string;
  num: number;
}

const CardList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsCollection = collection(firestore, 'jobs'); 
        const querySnapshot = await getDocs(jobsCollection);
        const jobsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as unknown as Job[];
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {jobs.map((job) => (
        <IonCard key={job.id}>
          <IonCardHeader>
            <IonCardTitle>{job.name}</IonCardTitle>
            <IonCardSubtitle>{job.num}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Description: {job.description}</p>
          </IonCardContent>
        </IonCard>
      ))}
    </div>
  );
};

export default CardList;