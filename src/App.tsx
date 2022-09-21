import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonPopover,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import { home, menu } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Menu from "./pages/Menu";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">This is the menu content.</IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonPopover trigger="click-trigger" triggerAction="click">
            <IonContent class="ion-padding">Hello World!</IonContent>
          </IonPopover>
          <IonTitle id="click-trigger">Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/menu">
                <Menu />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route exact path="/">
                <Redirect to="/menu" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="menu" href="/menu">
                <IonIcon icon={menu} />
                <IonLabel>Menu</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
    </IonPage>
  </IonApp>
);

export default App;
