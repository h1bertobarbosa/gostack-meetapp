import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Card = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.Image`
  height: 200px;
  border-radius: 4px;
  margin-top: 50px;
`;

export const Info = styled.View`
  margin-left: 15px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const InfoText = styled.Text`
  color: #9999;
  font-size: 13px;
  margin-top: 4px;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-size: 14px;
  margin-top: 4px;
`;

export const SubscriptionButton = styled(TouchableOpacity)`
  flex: 1;
  margin-top: 10px;
  margin-left: 35px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  height: 40px;
  width: 200px;
  font-weight: bold;
  font-size: 16px;
  background-color: #f94d6a;
  border-radius: 4px;
  opacity: ${props => (props.past ? '0.6' : '1')};
`;
