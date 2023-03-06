import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    width: '80%',
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#2e3e4f',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  region: {
    marginVertical: 8,
  },
  regionName: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  source: {
    marginLeft: 16,
    color: '#777',
  },
  regionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  drawerIcon: {
    marginLeft: 16,
  },
  drawerLabel: {
    marginLeft: -16,
    fontWeight: 'bold',
  },
  menuIcon: {
    marginLeft: 16,
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
});

export default styles;
