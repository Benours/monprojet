import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import { addCircle } from "ionicons/icons";
import { useState } from "react";
import { Plat } from "../schema/Plat";
import "./Form.css";

const Form: React.FC = () => {
    const[form,setForm] = useState<Plat>();

    let name: string;
    const [ingredient, setIngredient] = useState<string[]>([]);
    let country: string;
    let tabloRdm: string[];

    console.log(form);
    return(
        <IonPage>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Recipe Name</IonLabel>
                    <IonInput onIonChange={value => name = value.detail.value!}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Ingredient List</IonLabel>
                    <IonButton slot="end" onClick={() => {
                        const ing = [...ingredient,""];
                        setIngredient(ing);
                    } }><IonIcon icon={addCircle}>add Ingredient</IonIcon></IonButton>
                    {ingredient.map((e,i) =>{
                        return(<IonInput key={i} onIonChange={value => '' }/>)
                    })}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Origin Country</IonLabel>
                    <IonInput onIonChange={value => country = value.detail.value!}/>
                </IonItem>
                </IonContent>
                <IonButton onClick={()=> setForm({namePlate: name,ingredients: ingredient, nameCity: country})}>submit</IonButton>
        </IonPage>
    );
}

export default Form;
