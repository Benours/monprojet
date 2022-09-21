import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import { addCircle } from "ionicons/icons";
import { useState } from "react";
import "./Form.css";

const Form: React.FC = () => {
    const[form,setForm] = useState();
    return(
        <IonPage>
                <IonItem>
                    <IonLabel position="floating">Recipe Name</IonLabel>
                    <IonInput />
                </IonItem>
                <IonItem>
                    <IonLabel>Ingredient List</IonLabel>
                    <IonButton slot="end"><IonIcon icon={addCircle}></IonIcon></IonButton>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Origin Country</IonLabel>
                    <IonInput />
                </IonItem>
                <IonButton onClick={()=>{}}>submit</IonButton>
        </IonPage>
    );
}

export default Form;
