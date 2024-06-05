import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import './SignIn.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = () => {
    // Add sign-in logic here
    console.log('Sign in with', email, password);
  };

  const handleSignUp = () => {
    // Add sign-up logic here
    console.log('Sign up with', email, password);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="centered-content">
            <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
                type="email"
                value={email}
                onIonChange={e => setEmail(e.detail.value!)}
                required
            />
            </IonItem>
            <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
                type="password"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                required
            />
            </IonItem>
            <IonButton className="signIn" expand="block" onClick={isSignUp ? handleSignUp : handleSignIn}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
            </IonButton>
            <IonButton className="newUser" fill="clear" expand="block" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Sign In' : 'New user? Sign Up'}
            </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;