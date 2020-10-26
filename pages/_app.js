import React from "react";
import { appWithTranslation } from "../config/nextI18n";
import "antd/dist/antd.less";
import PropTypes from "prop-types";
import App from "next/app";

class MyApp extends App {
  static propTypes = {
    Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      .isRequired,
    pageProps: PropTypes.shape({}).isRequired
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />
  }
}

export function reportWebVitals(metric) {
  console.log(metric)
}

export default appWithTranslation(MyApp);
