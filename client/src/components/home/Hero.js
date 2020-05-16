import React from 'react';

const Hero = ({ hero, children }) => {
  return <div className={hero}>{children}</div>;
};

Hero.defaultProps = {
  hero: 'defaultHero',
};

export default Hero;
