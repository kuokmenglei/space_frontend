import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoadingProvider from "./context/LoadingProvider.jsx";
import App from "./App.jsx";
ReactDOM.createRoot(document.getElementById("root"))
        .render(
	        <React.StrictMode>
		        <LoadingProvider>
			        <App />
		        </LoadingProvider>
	        </React.StrictMode>
        );
