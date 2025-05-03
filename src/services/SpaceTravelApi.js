import SpaceTravelMockApi from "./SpaceTravelMockApi.js";

const API_BASE_URL = "http://localhost:8080";

class SpaceTravelApi {
  static async getPlanets() {
    //return SpaceTravelMockApi.getPlanets();
    try {
      const res = await fetch(`${API_BASE_URL}/planets`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch planets");
      const bodyData = await res.json();
      console.log("getPlanets response:", bodyData);

      if (bodyData && Array.isArray(bodyData)) {
        return { data: bodyData, isError: false };
      } else if (bodyData && Array.isArray(bodyData.data)) {
        return { data: bodyData.data, isError: false };
      } else {
        console.error("Invalid getPlanets data structure:", bodyData);
        return { bodyData: [], isError: true };
      }
    } catch (error) {
      console.error("Error fetching getPlanets:", error);
      return { bodyData: [], isError: true };
    }
  }

  static async getSpacecrafts() {
    //return SpaceTravelMockApi.getSpacecrafts();
    try {
      const res = await fetch(`${API_BASE_URL}/spacecrafts`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Failed to fetch spacecrafts", res.status);
        return { data: [], isError: true };
      }
      const bodyData = await res.json();
      console.log("getSpacecrafts response:", bodyData);

      if (bodyData && Array.isArray(bodyData)) {
        return { data: bodyData, isError: false };
      } else if (bodyData && Array.isArray(bodyData.data)) {
        return { data: bodyData.data, isError: false };
      } else {
        console.error("Invalid getSpacecrafts data structure:", bodyData);
        return { bodyData: [], isError: true };
      }
    } catch (error) {
      console.error("Error fetching getSpacecrafts:", error);
      return { bodyData: [], isError: true };
    }
  }

  static async getSpacecraftById({ id }) {
    //return SpaceTravelMockApi.getSpacecraftById({ id });
    try {
      const res = await fetch(`${API_BASE_URL}/spacecrafts/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const bodyData = await res.json();
      console.log("getSpacecraftById response:", bodyData);

      if (bodyData && Array.isArray(bodyData)) {
        return { data: bodyData, isError: false };
      } else if (bodyData && Array.isArray(bodyData.data)) {
        return { data: bodyData.data, isError: false };
      } else {
        console.error("Invalid getSpacecraftById data structure:", bodyData);
        return { bodyData: [], isError: true };
      }
    } catch (error) {
      console.error("Error fetching getSpacecraftById:", error);
      return { bodyData: [], isError: true };
    }
  }

  static async buildSpacecraft({
    name,
    capacity,
    description,
    pictureUrl = undefined,
  }) {
    // return SpaceTravelMockApi.buildSpacecraft({
    //   name,
    //   capacity,
    //   description,
    //   pictureUrl,
    // });
    try {
      const res = await fetch(`${API_BASE}/spacecrafts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, capacity, description, pictureUrl }),
      });
      const bodyData = await res.json();
      console.log("buildSpacecraft response:", bodyData);

      if (bodyData && Array.isArray(bodyData)) {
        return { data: bodyData, isError: false };
      } else if (bodyData && Array.isArray(bodyData.data)) {
        return { data: bodyData.data, isError: false };
      } else {
        console.error("Invalid buildSpacecraft data structure:", bodyData);
        return { bodyData: [], isError: true };
      }
    } catch (error) {
      console.error("Error fetching buildSpacecraft:", error);
      return { bodyData: [], isError: true };
    }
  }

  static async destroySpacecraftById({ id }) {
    // return SpaceTravelMockApi.destroySpacecraftById({ id });
    await fetch(`${API_BASE}/spacecrafts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return { success: true };
  }

  static async sendSpacecraftToPlanet({ spacecraftId, targetPlanetId }) {
    // return SpaceTravelMockApi.sendSpacecraftToPlanet({
    //   spacecraftId,
    //   targetPlanetId,
    // });
    try {
      const res = await fetch(`${API_BASE}/missions/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ spacecraftId, targetPlanetId }),
      });
      const bodyData = await res.json();
      console.log("sendSpacecraftToPlanet response:", bodyData);

      if (bodyData && Array.isArray(bodyData)) {
        return { data: bodyData, isError: false };
      } else if (bodyData && Array.isArray(bodyData.data)) {
        return { data: bodyData.data, isError: false };
      } else {
        console.error(
          "Invalid sendSpacecraftToPlanet data structure:",
          bodyData
        );
        return { bodyData: [], isError: true };
      }
    } catch (error) {
      console.error("Error fetching sendSpacecraftToPlanet:", error);
      return { bodyData: [], isError: true };
    }
  }

  static async interceptConsoleLogs() {
    return SpaceTravelMockApi.interceptConsoleLogs();
  }

  static async getLogsFromLocalStorage() {
    return SpaceTravelMockApi.getLogsFromLocalStorage();
  }
}

export default SpaceTravelApi;
