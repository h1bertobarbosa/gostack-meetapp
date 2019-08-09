import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import { Container, Title, List } from './styles';
import Background from '~/components/Background';
import Meetapp from '~/components/Meetapp';

function Subscription({ isFocused }) {
  const [subscriptions, setSubscription] = useState([]);
  async function loadSubscriptions() {
    const response = await api.get('subscriptions');
    setSubscription(response.data);
  }

  useEffect(() => {
    loadSubscriptions();
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`subscriptions/${id}`);

      setSubscription(subscriptions.filter(obj => obj.id !== id));
      Alert.alert('Successo', 'Sua inscricao foi desfeita com sucesso');
    } catch (err) {
      Alert.alert('Erro!', 'Erro ao tentar cancelar inscrição');
    }
  }

  return (
    <Background>
      <Container>
        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetapp
              onCancel={() => handleCancel(item.id)}
              data={item.Meetup}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Minhas inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscription);
