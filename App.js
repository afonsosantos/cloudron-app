import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { name as appName } from "./app.json";
import AppItem from "./src/components/AppItem";
import useApps from "./src/hooks/useApps";

export default function App() {
  const [{ data, error, loading }, getApps] = useApps();

  useEffect(() => {
    getApps();
  }, []);

  if (loading) return <ActivityIndicator size="large" marginVertical={100} />;

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cloudron Apps</Text>
      </View>

      {data && (
        <FlatList
          data={data}
          keyExtractor={(app) => app.id}
          renderItem={({ item }) => (
            <AppItem
              appId={item.id}
              name={item.manifest.title}
              appUrl={item.fqdn}
              status={item.runState}
              creationTime={item.creationTime}
              lastUpdate={item.updateTime}
              appTagline={item.manifest.tagline}
            />
          )}
          style={styles.apps}
          showsVerticalScrollIndicator={false}
          vertical
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#05a9f4",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90,
  },
  title: {
    fontSize: 20,
    marginTop: 42,
    marginLeft: 15,
    color: "#fff",
    fontWeight: "300",
  },
  apps: {
    marginTop: 100,
  },
});

AppRegistry.registerComponent(appName, () => App);
