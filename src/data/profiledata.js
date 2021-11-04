const profiledata = [
  {
    picOption: 1,
    picUrl: require('../assets/images/profiles/pic1.png'),
  },
  {
    picOption: 2,
    picUrl: require('../assets/images/profiles/pic2.png'),
  },
  {
    picOption: 3,
    picUrl: require('../assets/images/profiles/pic3.png'),
  },
  {
    picOption: 4,
    picUrl: require('../assets/images/profiles/pic4.png'),
  },
  {
    picOption: 5,
    picUrl: require('../assets/images/profiles/pic5.png'),
  },
  {
    picOption: 6,
    picUrl: require('../assets/images/profiles/pic6.png'),
  },
  {
    picOption: 7,
    picUrl: require('../assets/images/profiles/pic7.png'),
  },
  {
    picOption: 8,
    picUrl: require('../assets/images/profiles/pic8.png'),
  },
  {
    picOption: 9,
    picUrl: require('../assets/images/profiles/pic9.png'),
  },
  {
    picOption: 10,
    picUrl: require('../assets/images/profiles/pic10.png'),
  },
  {
    picOption: 11,
    picUrl: require('../assets/images/profiles/pic11.png'),
  },
  {
    picOption: 12,
    picUrl: require('../assets/images/profiles/pic12.png'),
  },
  {
    picOption: 13,
    picUrl: require('../assets/images/profiles/pic13.png'),
  },

];

const picFunction = (param) => {
  switch(param) {
    case 1 : return require('../assets/images/profiles/pic1.png');
      break;
    case 2 : return require('../assets/images/profiles/pic2.png');
      break;
    case 3 : return require('../assets/images/profiles/pic3.png');
      break;
    case 4 : return require('../assets/images/profiles/pic4.png');
      break;
    case 5 : return require('../assets/images/profiles/pic5.png');
      break;
    case 6 : return require('../assets/images/profiles/pic6.png');
      break;
    case 7 : return require('../assets/images/profiles/pic7.png');
      break;
    case 8 : return require('../assets/images/profiles/pic8.png');
      break;
    case 9 : return require('../assets/images/profiles/pic9.png');
      break;
    case 10 : return require('../assets/images/profiles/pic10.png');
      break;
    case 11 : return require('../assets/images/profiles/pic11.png');
      break;
    case 12 : return require('../assets/images/profiles/pic12.png');
      break;
    case 13 : return require('../assets/images/profiles/pic13.png');
      break;
    default: return require('../assets/images/profiles/pic1.png');

  }
}

export {profiledata, picFunction}
