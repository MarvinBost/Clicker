import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const cherryPickedKeys = ["REACT_APP_ENCRYPTION_KEY"];

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv: {[key: string]: string} = {};
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));
  return {
    base: "/Clicker/",
    define: {
      "process.env": processEnv,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@features": path.resolve(__dirname, "./src/store/features"),
        "@store": path.resolve(__dirname, "./src/store"),
      },
    },
    plugins: [react()],
  };
});
