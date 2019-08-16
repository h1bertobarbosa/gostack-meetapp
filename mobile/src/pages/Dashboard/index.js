import React, { useEffect, useState, useMemo } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import { Container, Title, List } from './styles';
import Background from '~/components/Background';
import Meetapp from '~/components/Meetapp';
import { addDays, subDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

function Dashboard({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [meetapps, setMeetapps] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadMeetapps() {
    const response = await api.get('meetups', {
      params: {
        date: date.toISOString(),
      },
    });
    setLoading(false);
    setMeetapps(response.data);
  }

  useEffect(() => {
    loadMeetapps();
  }, [date]);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  async function handleSubscription(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);
      Alert.alert('Successo', 'Sua inscricao foi realizada com sucesso');
    } catch (err) {
      Alert.alert('Erro!', 'Erro ao tentar se inscrever');
    }
  }

  function handleSelectDate(side) {
    setLoading(true);
    if (side === 'left') {
      setDate(subDays(date, 1));
    } else {
      setDate(addDays(date, 1));
    }
  }

  return (
    <Background>
      <Container>
        <TouchableOpacity
          style={styles.chevronLeft}
          onPress={() => handleSelectDate('left')}
        >
          <Icon name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Title>{dateFormatted}</Title>
        <TouchableOpacity
          style={styles.chevronRight}
          onPress={() => handleSelectDate('right')}
        >
          <Icon name="chevron-right" size={20} color="#fff" />
        </TouchableOpacity>

        {loading ? (
          <Title>Carregando...</Title>
        ) : (
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
        )}
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

const styles = StyleSheet.create({
  chevronRight: {
    marginTop: 33,
    marginLeft: '80%',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 30,
    fontFamily: 'material',
  },
  chevronLeft: {
    marginTop: 33,
    marginLeft: '15%',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 30,
    fontFamily: 'material',
  },
});

export default withNavigationFocus(Dashboard);
