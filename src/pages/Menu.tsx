import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import "./Menu.css";

const Menu: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const listCourses = ["Carotte", "Patate", "Melon"];
  return (
    <IonPage>
      <IonContent fullscreen>
        <h2>Liste de courses</h2>
        {listCourses.map((item, index) => {
          return (
            <IonCard>
              <IonCardTitle>{item}</IonCardTitle>
              <IonCardSubtitle>{index + 1}</IonCardSubtitle>
              <IonCardContent>
                C'est l'element {index + 1} sur {listCourses.length + 1} de ma
                liste de course
              </IonCardContent>
            </IonCard>
          );
        })}
        <IonButton
          onClick={() =>
            presentAlert({
              header: "Alert",
              subHeader: "Important message",
              message: "This is an alert!",
              buttons: ["OK"],
            })
          }
        >
          Click Me
        </IonButton>
        <IonButton href="/list">List</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Menu;
