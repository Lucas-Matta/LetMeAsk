import { HeaderRoom, ContentHeader } from '../styles/header';

import React, { useContext } from "react";

import Switch from "react-switch";
import useToggleTheme from "../hooks/useToggleTheme";
import { DARK } from "../constants/theme";
import { ThemeContext } from "styled-components";

import { RoomCode } from '../components/RoomCode';
import logoImg from '../assets/logo.svg';
import { useParams } from "react-router-dom";

import logoImgPreto from '../assets/logo.svg';
import logoImgBranco from '../assets/logoBranca.png';

// TypeScript
type RoomParams = {
    id: string;
}

const Header: React.FC = () => {
  const { colors, titleTheme } = useContext(ThemeContext);
  const { toggleTheme } = useToggleTheme();

  const params = useParams<RoomParams>();
  const roomId = params.id

  return (
    <>
        <HeaderRoom>
            <ContentHeader id="content" >
                { titleTheme === DARK ? (
                        <img src={logoImgBranco} alt="Letmeask" />
                    ):(
                        <img src={logoImgPreto} alt="Letmeask" />
                )}
                <RoomCode code={roomId} />
                <Switch
                    onChange={toggleTheme}
                    checked={titleTheme === DARK}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={10}
                    width={40}
                    handleDiameter={20}
                    offColor={colors.primary}
                    onColor={colors.secundary}
                />
            </ContentHeader>
        </HeaderRoom>   
    </>
  );
};

export default Header;
