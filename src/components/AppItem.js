import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking,
  StyleSheet,
} from "react-native";
import moment from "moment";
import { ACCESS_TOKEN } from "../config";

export default function AppItem({
  appId,
  name,
  appUrl,
  status,
  creationTime,
  appTagline,
}) {
  const openInBrowser = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(`https://${url}`);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <TouchableOpacity
      onPress={() => openInBrowser(appUrl)}
      style={styles.itemContainer}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://my.apps.santostuff.xyz/api/v1/apps/${appId}/icon?access_token=${ACCESS_TOKEN}`,
          }}
          style={styles.image}
        ></Image>
        <View>
          <Text style={styles.appName}>{name} </Text>
          <Text
            style={{
              fontWeight: "normal",
              fontSize: 12,
              color: "#696969",
            }}
          >
            {appTagline}
          </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text>
          {status === "running" ? (
            <Text style={[styles.statusRunning, styles.statusLabel]}>
              Running
            </Text>
          ) : (
            <Text style={[styles.statusStopped, styles.statusLabel]}>
              Stopped
            </Text>
          )}
          <Text>
            {" | Installed on " + moment(creationTime).format("DD/MM/YYYY")}
          </Text>
        </Text>
        <Text style={{ marginTop: 5, fontSize: 10 }}>
          {"https://" + appUrl}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 15,
    borderColor: "#DCDCDC",
    borderTopWidth: 0.75,
    borderBottomWidth: 0.75,
    paddingVertical: 10,
  },
  container: {
    marginLeft: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    maxWidth: 60,
    height: 60,
    flex: 1,
    marginRight: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  infoContainer: {
    marginLeft: 15,
    marginTop: 20,
  },
  statusLabel: {
    fontWeight: "bold",
  },
  statusStopped: {
    color: "red",
  },
  statusRunning: {
    color: "green",
  },
});
