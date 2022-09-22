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
import React, { useEffect, useState } from "react";
import { Plat } from "../schema/Plat";
import "./List.css";

class List extends React.Component {
  state = {
    text: "",
    listPlat: [
      {
        namePlate: "Tomate",
        ingredients: ["tomate"],
        nameCity: "TomatoCity",
      },
    ],
  };
  // const [text, setText] = useState<string>("");
  // const [listPlat, setListPlat] = useState<Plat[]>([
  //   {
  //     namePlate: "Tomate",
  //     ingredients: ["tomate"],
  //     nameCity: "TomatoCity",
  //   },
  // ]);
  t = "key";

  componentDidMount = async () => {
    await this.setListePLat();
    await this.checkName();
  };

  componentDidUpdate = async () => {
    // this.componentDidMount();
  };

  setListePLat = async () => {
    const { value } = await Preferences.get({ key: "ListePlats" });
    const liste = JSON.parse(value!) || [];
    this.setState({ listPlat: liste });
  };

  checkName = async () => {
    const { listPlat } = this.state;
    Preferences.keys().then((list) => {
      list.keys.forEach(async (key) => {
        if (!key.includes("ListePlats")) {
          const { value } = await Preferences.get({ key: key });
          this.save([...listPlat!, JSON.parse(value!)]);
          Preferences.remove({ key: key });
        }
      });
    });
  };

  save = async (liste: Plat[]) => {
    await Preferences.set({
      key: "ListePlats",
      value: JSON.stringify(liste),
    });
    this.setState({ listPlat: liste });
  };

  compareName = (platA: Plat, platB: Plat) => {
    if (platA.namePlate.toLowerCase() < platB.namePlate.toLowerCase())
      return -1;
    if (platA.namePlate.toLowerCase() > platB.namePlate.toLowerCase()) return 1;
    return 0;
  };

  compareCity = (platA: Plat, platB: Plat) => {
    if (platA.nameCity.toLowerCase() < platB.nameCity.toLowerCase()) return -1;
    if (platA.nameCity.toLowerCase() > platB.nameCity.toLowerCase()) return 1;
    return 0;
  };

  //  didMount = async () => {
  //   await checkName();
  //   binit = true;
  //   await setListePLat();
  // };

  // if (!binit) {
  //   didMount();
  // }

  render() {
    const { listPlat, text } = this.state;

    return (
      <IonPage>
        <IonContent>
          <IonButtons>
            <IonLabel>Trier par :</IonLabel>
            <IonButton
              onClick={() => {
                const newList = [...listPlat!].sort(this.compareName);
                this.setState({ listPlat: newList });
              }}
            >
              Nom
            </IonButton>
            <IonButton
              onClick={() => {
                const newList = [...listPlat!].sort(this.compareCity);
                this.setState({ listPlat: newList });
              }}
            >
              Origin
            </IonButton>
          </IonButtons>
          <IonList>
            <IonItem key={this.t}>
              <IonLabel position="floating">Rechercher</IonLabel>
              <IonInput
                value={text}
                onIonChange={(e) => this.setState({ text: e.detail.value! })}
              ></IonInput>
            </IonItem>
            {listPlat!.length > 0 ? (
              listPlat!.map((plat, index) => {
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
                            ...listPlat!.slice(0, index),
                            ...listPlat!.slice(index + 1),
                          ];
                          this.save(newList);
                        }}
                      >
                        <IonIcon icon={close} />
                      </IonButton>
                    </IonItem>
                  );
                }
              })
            ) : (
              <></>
            )}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default List;
