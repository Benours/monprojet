import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import { close } from "ionicons/icons";
import { useState } from "react";
import { Plat } from "../schema/Plat";
import "./List.css";

const List: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [listPlat, setListPlat] = useState<Plat[]>([
    {
      namePlate: "Brandade",
      ingredients: [
        "Patate",
        "Persil",
        "Huile d'olive",
        "Morue salée",
        "Amour",
      ],
      nameCity: "Marseille",
    },
    {
      namePlate: "Tacos",
      ingredients: [
        "Galette de mais",
        "Oignon",
        "Viande hachée",
        "Tomate",
        "Amour",
      ],
      nameCity: "Mexico City",
    },
    {
      namePlate: "Burger",
      ingredients: [
        "Pain",
        "Steack",
        "Cheddar",
        "Salade",
        "Tomate",
        "Mayo",
        "Amour",
      ],
      nameCity: "Hambourg",
    },
  ]);

  const checkName = async () => {
    const { value } = await Preferences.get({ key: "Ingredients" });
    console.log(value);
  };

  const compareName = (platA: Plat, platB: Plat) => {
    if (platA.namePlate.toLowerCase() < platB.namePlate.toLowerCase())
      return -1;
    if (platA.namePlate.toLowerCase() > platB.namePlate.toLowerCase()) return 1;
    return 0;
  };

  const compareCity = (platA: Plat, platB: Plat) => {
    if (platA.nameCity.toLowerCase() < platB.nameCity.toLowerCase()) return -1;
    if (platA.nameCity.toLowerCase() > platB.nameCity.toLowerCase()) return 1;
    return 0;
  };

  checkName();

  return (
    <IonPage>
      <IonContent>
        <IonButtons>
          <IonLabel>Trier par :</IonLabel>
          <IonButton
            onClick={() => {
              const newList = [...listPlat].sort(compareName);
              setListPlat(newList);
            }}
          >
            Nom
          </IonButton>
          <IonButton
            onClick={() => {
              const newList = [...listPlat].sort(compareCity);
              setListPlat(newList);
            }}
          >
            Origin
          </IonButton>
        </IonButtons>
        <IonList>
          <IonItem key={"input"}>
            <IonLabel position="floating">Rechercher</IonLabel>
            <IonInput
              value={text}
              onIonChange={(e) => setText(e.detail.value!)}
            ></IonInput>
          </IonItem>
          {listPlat.map((plat, index) => {
            if (
              plat.namePlate.includes(text!) ||
              plat.nameCity.includes(text!)
            ) {
              return (
                <IonItem key={index}>
                  <IonLabel>
                    <strong>{plat.namePlate}</strong> from{" "}
                    <strong>{plat.nameCity}</strong>
                  </IonLabel>
                  <IonButton
                    onClick={() => {
                      const newList = [
                        ...listPlat.slice(0, index),
                        ...listPlat.slice(index + 1),
                      ];
                      setListPlat(newList);
                    }}
                  >
                    <IonIcon icon={close} />
                  </IonButton>
                </IonItem>
              );
            }
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default List;
