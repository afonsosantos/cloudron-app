import { useState } from "react";
import api from "../api";

export default () => {
  const [apps, setApps] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const getApps = async () => {
    setApps({
      data: null,
      loading: true,
      error: null,
    });

    try {
      const response = await api.get("/apps");

      setApps({
        data: response.data.apps,
        loading: false,
        error: null,
      });
    } catch (error) {
      setApps({
        data: null,
        loading: false,
        error: "Something went wrong",
      });
    }
  };

  return [apps, getApps];
};
