import React from 'react';
import './Hero.css';

const Hero = ({ hero, children }) => {
  return <div className={hero}>{children}</div>;
};

Hero.defaultProps = {
  hero: 'defaultHero',
};

export default Hero;
