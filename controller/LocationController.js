import * as Location from "expo-location";

export let locationPermissionAsync = async () => {
  const grantedPermission = await Location.getForegroundPermissionsAsync();
  if (grantedPermission.status === "granted") return true;
  else {
    const permissionResponse =
      await Location.requestForegroundPermissionsAsync();
    if (permissionResponse.status === "granted") return true;
  }
  return false;
};
