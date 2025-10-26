import React from 'react';
import {
  FaHome,
  FaCompass,
  FaPlay,
  FaTv,
  FaVideo,
  FaHistory,
  FaSearch,
  FaMicrophone,
  FaTh,
  FaEllipsisV,
  FaMusic,
  FaTrophy,
  FaGamepad,
  FaFilm,
  FaNewspaper,
  FaGithub,
  FaYoutube,
  FaBars,
  FaClock,
  FaList,
  FaCheckCircle,
} from 'react-icons/fa';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#606060' }) => {
  const iconMap: { [key: string]: any } = {
    menu: FaBars,
    home: FaHome,
    explore: FaCompass,
    github: FaGithub,
    youtube: FaYoutube,
    shorts: FaPlay,
    subscriptions: FaTv,
    'video-library': FaVideo,
    history: FaHistory,
    search: FaSearch,
    mic: FaMicrophone,
    apps: FaTh,
    'more-vert': FaEllipsisV,
    'music-note': FaMusic,
    sports: FaTrophy,
    'sports-esports': FaGamepad,
    movie: FaFilm,
    article: FaNewspaper,
    clock: FaClock,
    list: FaList,
    'check-circle': FaCheckCircle,
  };

  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return <span style={{ fontSize: size, color }}>?</span>;
  }

  return <IconComponent size={size} color={color} />;
};

export default Icon;
