import styled, { css } from 'styled-components'
import boxShadow3d from './utils/boxShadow3d'
import shadeColor from './utils/shadeColor'

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Main = styled.div`
  ${flexCenter}
  height: 100vh;
  width: 100vw;
  background: #333;
`

export const MainCircle = styled.div`
  ${flexCenter}
  position: relative;
  width: calc(100vw - 40px);
  height: calc(100vw - 40px);
  max-width: 400px;
  max-height: 400px;
  background: #ECF0F1;
  border-radius: 50%;
  box-shadow: ${boxShadow3d(13, '#c7d6da')}
`

export const Mask = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  background: #ECF0F1;
  border-radius: 50%;
  overflow: hidden;
`

export const Card = styled.div`
  width: calc(50% - 5px);
  height: calc(50% - 5px);
  background: ${(props) => props.color};
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    background: ${props => props.shouldGlow
      ? 'rgba(0, 0, 0, 0)'
      : 'rgba(0, 0, 0, 0.3)'
    };
  }
`


export const InnerMask = styled.div`
  ${flexCenter}
  width: 37.5%;
  height: 37.5%;
  position: absolute;
  background: #ECF0F1;
  border-radius: 50%;
  text-align: center;
`

export const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
`

export const ControlsContainer = styled.div`
  ${flexCenter}
  width: 100vw;
  height: 100px;
`

export const ButtonsContainer = styled.div`
  ${flexCenter}
  justify-content: space-between;
  width: 300px;
  height: 100%;
`

export const LevelCount = styled.div`
  font-size: 36px;
`