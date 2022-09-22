import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import { addCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Plat } from "../schema/Plat";
import "./Form.css";

const Form: React.FC = () => {
  const [form, setForm] = useState<Plat>();

  const [name, setName] = useState<string>();
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [country, setCountry] = useState<string>();

  const setPlate = () => {
    if (form?.namePlate !== undefined)
      Preferences.set({
        key: JSON.stringify(form?.namePlate),
        value: JSON.stringify(form),
      });
  };

  useEffect(setPlate, [form]);

  return (
    <IonPage>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Recipe Name</IonLabel>
          <IonInput onIonChange={(value) => setName(value.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Ingredient List</IonLabel>
          <IonButton
            slot="end"
            onClick={() => {
              const ing = [...ingredient, ""];
              setIngredient(ing);
            }}
          >
            <IonIcon icon={addCircle}>add Ingredient</IonIcon>
          </IonButton>
          {ingredient.map((e, i) => {
            return (
              <IonInput
                key={i}
                onIonChange={(value) => {
                  const tab = [...ingredient];
                  tab[i] = value.detail.value!;
                  setIngredient(tab);
                }}
              />
            );
          })}
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Origin Country</IonLabel>
          <IonInput onIonChange={(value) => setCountry(value.detail.value!)} />
        </IonItem>
      </IonContent>
      <IonButton
        onClick={() => {
          setForm({
            namePlate: name!,
            ingredients: ingredient,
            nameCity: country!,
          });
        }}
        href="/menu"
      >
        submit
      </IonButton>
    </IonPage>
  );
};

export default Form;
