import '../styles/room2.scss'

import React, { useContext } from "react";
import Switch from "react-switch";
import { ThemeContext } from "styled-components";

import { DARK } from "../constants/theme";
import useToggleTheme from "../hooks/useToggleTheme";

import { RoomCode } from '../components/RoomCode';
import logoImg from '../assets/logo.svg';
import { useParams } from "react-router-dom";

// TypeScript
type RoomParams = {
    id: string;
}

const Header: React.FC = () => {
  const { colors, title } = useContext(ThemeContext);
  const { toggleTheme } = useToggleTheme();

  const params = useParams<RoomParams>();
  const roomId = params.id

  return (
    <>
        <header>
            <div className="content">
                <img src={logoImg} alt="Logo letmeask" />
                <RoomCode code={roomId} />
                <Switch
                    onChange={toggleTheme}
                    checked={title === DARK}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={10}
                    width={40}
                    handleDiameter={20}
                    offColor={colors.primary}
                    onColor={colors.secundary}
                />
            </div>
        </header>   
    </>
  );
};

export default Header;
