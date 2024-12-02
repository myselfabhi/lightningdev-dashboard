import "../styles/globals.css";
import "../styles/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;