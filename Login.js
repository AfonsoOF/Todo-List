import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [users,setUsers] = useState([]);

  async function login(){
    const search = users.filter(users => users.email === email && users.senha === senha);

    if (search.length === 0) {
      Alert.alert("Login", "Usuário não encontrado");
      return;
    }
    Alert.alert('Login','Logado com sucesso')
  }

  async function cadastro(){

    const search = users.filter(users => users.email === email)

    if(search.length !== 0){
      Alert.alert('Cadastro','Email já cadastrado')
      return
    }
    let user = {
      'email': email,
      'senha':senha
    }

    setUsers([...users, user])

    Alert.alert('Cadastro','Cadastrado')

  }

  useEffect(() => {
    async function Dados() {
      const logins = await AsyncStorage.getItem("user");

      if (logins) {
        setUsers(JSON.parse(logins));
      }
    }
    Dados();
  }, []);

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem("user", JSON.stringify(users));
    }
    salvaDados();
  }, [users]);

  function deletar(){
    setUsers([])
    setSenha('')
    setEmail('')
    Alert.alert('Deletar','Todos os usuários deletados com sucesso.')
  }

  return (
    <View style={styles.container}>

        <View style={styles.header}>
            <Text style={styles.primeiroTitle}>Sua</Text>
            <Text style={styles.segundoTitle}>Lista</Text>
        </View>
        <TextInput placeholder="Digite seu email" style={styles.input} onChangeText={setEmail} value={email}/>
        <TextInput placeholder="Digite sua senha" secureTextEntry={true} style={styles.input} onChangeText={setSenha} value={senha}/>

        <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCadastro} onPress={cadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.Delete} onPress={() => deletar()}>
            <Text style={styles.buttonText}>Deleta</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,

  },
  input:{
    marginTop: 15,
    width: 300,
    padding:10,
    height:30,
    fontSize: 16,
    backgroundColor:'#EEEFee',
    top: 150,
    borderRadius:10,

  },
  button:{
    width:120,
    height:42,
    backgroundColor:'#5d62fa',
    marginTop: 35,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:16,
    color:'#fff'
  },
  buttonCadastro:{
    width: 120,
    height:42,
    backgroundColor:'#483D8B',
    marginTop: 10,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center'
  },
  Delete:{
    width: 300,
    fontSize:6,
    height:12,
    backgroundColor:'#333',
    marginTop: 100,
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center'
  },
  logo:{
    marginTop: 50,
    borderRadius: 50,  
  },
  primeiroTitle: {
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    fontWeight: "bold",
    color: '#5d62fa',
    alignItems: 'center',
    fontWeight:'bold',
    
  },
  segundoTitle: {
    fontFamily: 'sans-serif-light',
    fontSize: 32,
    color: '#5d62fa',
    marginLeft: 6,
    alignItems: 'center',
    fontWeight:'bold',
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: '30%',
    paddingBottom: 50,
    marginBottom: 50,
    top: -20,
    backgroundColor: "#C0D1F0",
    borderRadius:50,


}});