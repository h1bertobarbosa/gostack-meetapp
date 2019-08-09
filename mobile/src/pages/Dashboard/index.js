import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import { Container, Title, List } from './styles';
import Background from '~/components/Background';
import Meetapp from '~/components/Meetapp';
import DateInput from '~/components/DateInput';

function Dashboard({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [meetapps, setMeetapps] = useState([]);
  async function loadMeetapps() {
    const response = await api.get('meetups', {
      params: {
        date: date.toISOString(),
      },
    });
    setMeetapps(response.data);
  }

  useEffect(() => {
    loadMeetapps();
  }, [date]);

  async function handleSubscription(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);
      Alert.alert('Successo', 'Sua inscricao foi realizada com sucesso');
    } catch (err) {
      Alert.alert('Erro!', 'Erro ao tentar se inscrever');
    }
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <List
          data={meetapps}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetapp
              onSubscription={() => handleSubscription(item.id)}
              data={item}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetapps',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
