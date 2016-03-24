"use strict";

import Header from "./common/Header";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Carousel from "./home/Carousel";
import ProductSeries from "./home/ProductSeries";
import Platform from "./home/Platform";
import Partners from "./home/Partners";
import Experience from "./home/Experience";
import Sidebar from "./home/Sidebar";

require("styles/less/home.less");

var HomePage = React.createClass({
  render() {
    return (
      <div className="hsy-home">
        <Header home/>
        <Navbar/>
        <Carousel/>
        <ProductSeries/>
        <Platform/>
        <Partners/>
        <Experience/>
        <Footer bgStyle="dark"/>
        <Sidebar/>
      </div>
    );
  }
});

module.exports = HomePage;
