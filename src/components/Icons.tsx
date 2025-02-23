import React from 'react';
import type {PropsWithChildren} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

type IconProps = PropsWithChildren<{
  name: string;
}>;

const Icons = ({name, color = 'white'}: {name: string; color: string}) => {
  switch (name) {
    case 'circle':
      return (
        <Entypo
          name="circle"
          size={40}
          color={color === 'null' ? '#feaf13' : color}></Entypo>
      );
      break;
    case 'cross':
      return (
        <Entypo
          name="cross"
          size={50}
          color={color === 'null' ? '#7022dd' : color}></Entypo>
      );
      break;
    default:
      return <Entypo name="" size={40} color={'#feaf13'}></Entypo>;
      break;
  }
};

export default Icons;
