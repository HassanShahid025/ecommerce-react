import React from "react";
import { Card } from "../../components/card/Card";
import { Filters } from "../../components/filters/Filter";
import { Filter2 } from "../../components/filters/Filter2";

import Slider from "../../components/slider/Slider";
import "./home.scss";

const Home = () => {
  return (
    <div>
      <Slider />
      <div className="below-slider-content">
        <Filters/>
        <div>
          <Filter2/>
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Home;
