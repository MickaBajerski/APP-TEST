import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F7F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#424B54",
    textShadowColor: "#B0B6BB",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: "#FFFFFF",
    width: "80%",
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderColor: "#C3CFD9",
    borderWidth: 1,
    color: "#424B54",
  },
  button: {
    backgroundColor: "#3CB371",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    shadowColor: "#2E8B57",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  region: {
    marginVertical: 8,
  },
  regionName: {
    fontWeight: "bold",
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  source: {
    marginLeft: 16,
    color: "#777",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  regionsTitle: {
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 4,
  },
  drawerIcon: {
    marginLeft: 16,
  },
  drawerLabel: {
    marginLeft: -16,
    fontWeight: "bold",
  },
  menuIcon: {
    marginLeft: 16,
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: "contain",
  },
  regionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sourcesContainer: {
    backgroundColor: "#F5F5F5",
    padding: 4,
  },
  sourceContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 5,
    marginBottom: 4,
  },
  source: {
    color: "#777",
  },
  urlButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#B0B6BB",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  selectedUrlButton: {
    backgroundColor: "#3CB371",
  },
  urlButtonText: {
    color: "#424B54",
    fontWeight: "bold",
  },
  requestButton: {
    backgroundColor: "#3CB371",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    shadowColor: "#2E8B57",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  requestButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
