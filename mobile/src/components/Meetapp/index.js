import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  Container,
  Card,
  Avatar,
  Info,
  Name,
  InfoText,
  TextButton,
  SubscriptionButton,
} from './styles';

export default function Meetapp({ data, onSubscription, onCancel }) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.date), "dd 'de' MMMM', às' H'h'", {
      locale: pt,
    });
  }, [data.date]);

  return (
    <Container>
      <Card>
        <Avatar
          source={{
            uri: data.banner
              ? `http://192.168.0.104:3333/files/${data.banner.path}`
              : 'https://www.dicesaloon.com/system/production/dice_saloon/events/main_images/000/005/389/full/Transformers_meetup.jpg?1554116146',
          }}
        />
        <Info>
          <Name>{data.title}</Name>
          <InfoText>
            <Icon name="event" size={20} color="#333" />
            {dateParsed}
          </InfoText>
          <InfoText>
            <Icon name="place" size={20} color="#333" />
            {data.localization}
          </InfoText>
          <InfoText>
            <Icon name="person" size={20} color="#333" />
            Organizador: {data.organizer.name}
          </InfoText>
        </Info>

        {onSubscription && (
          <SubscriptionButton
            onPress={onSubscription}
            disabled={data.past}
            past={data.past}
          >
            <TextButton>Realizar inscrição</TextButton>
          </SubscriptionButton>
        )}

        {onCancel && (
          <SubscriptionButton
            onPress={onCancel}
            disabled={data.past}
            past={data.past}
          >
            <TextButton>Cancelar inscrição</TextButton>
          </SubscriptionButton>
        )}
      </Card>
    </Container>
  );
}
